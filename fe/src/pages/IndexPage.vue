<template>
  <div class="popup-content">
    <q-btn color="primary">
      Pop-up
      <q-popup-edit v-model="newArticle">
        <form @submit.prevent="addArticle" class="form">
          <article-form :new-article="newArticle" />
          <div class="form-buttons" v-close-popup>
            <q-btn type="button" color="grey-5">Close</q-btn>
            <q-btn type="button" color="grey-5" @click="fetchArticles"
              >Refresh</q-btn
            >
            <q-btn type="submit" color="primary">Add Article</q-btn>
          </div>
        </form>
      </q-popup-edit>
    </q-btn>
  </div>

  <q-table
    :rows="articles"
    :columns="columns"
    :pagination="pagination"
    row-key="id"
    :loading="loading"
  >
    <template v-slot:body-cell-update="props">
      <q-td :props="props">
        <q-btn color="positive">
          Update
          <q-popup-edit v-model="newArticle">
            <form
              @submit.prevent="() => updateArticle(props.row.article_id)"
              class="form"
            >
              <article-form :new-article="newArticle" />
              <div class="form-buttons" v-close-popup>
                <q-btn type="button" color="grey-5" v-close-popup>Close</q-btn>
                <q-btn type="submit" color="primary">Update Article</q-btn>
              </div>
            </form>
          </q-popup-edit>
        </q-btn>
      </q-td>
    </template>
    <template v-slot:body-cell-delete="props">
      <q-td :props="props">
        <q-btn color="negative" @click="deleteArticle(props.row.article_id)">
          Delete
        </q-btn>
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts">
import { Notify } from 'quasar';
import useArticleService from 'src/api/article';
import { ArticleUpdate } from 'src/components/models';
import ArticleForm from 'src/components/ArticleForm.vue';
import { Articles } from 'src/components/models';
import { defineComponent, ref, onMounted } from 'vue';
import { QTableColumn } from 'quasar';

export default defineComponent({
  components: { ArticleForm },
  setup() {
    const { getAll, remove, post, put } = useArticleService();

    const articles = ref<Articles>([]);
    const newArticle = ref<ArticleUpdate>({
      title: '',
      content: '',
      release_date: '',
    });
    const loading = ref(false);

    const fetchArticles = async () => {
      loading.value = true;
      articles.value = await getAll();
      loading.value = false;
    };

    const deleteArticle = async (articleId: number) => {
      const response = await remove(articleId);
      if (response === 200) {
        await fetchArticles();
        Notify.create({
          type: 'positive',
          message: 'Successfully deleted an article',
        });
      } else {
        Notify.create({
          type: 'negative',
          message: 'Failed to delete an article',
        });
      }
    };

    const addArticle = async () => {
      const result = await post(newArticle.value);
      if (result === 200) {
        Notify.create({
          type: 'positive',
          message: 'Successfully added new article',
        });
        await fetchArticles();
      } else {
        Notify.create({
          type: 'negative',
          message: 'Failed to add new article',
        });
      }
      newArticle.value = { title: '', content: '', release_date: '' };
    };

    const updateArticle = async (article_id: number) => {
      const result = await put(article_id, newArticle.value);
      if (result === 200) {
        newArticle.value = { title: '', content: '', release_date: '' };
        Notify.create({
          type: 'positive',
          message: 'Successfully updated an article',
        });
        await fetchArticles();
      } else {
        Notify.create({
          type: 'negative',
          message: 'Failed to update an article',
        });
      }
      newArticle.value = { title: '', content: '', release_date: '' };
    };

    const columns: QTableColumn[] = [
      { name: 'article_id', label: 'ID', field: 'article_id', align: 'left' },
      {
        name: 'release_date',
        label: 'Release Date',
        field: 'release_date',
        align: 'left',
      },
      { name: 'title', label: 'Title', field: 'title', align: 'center' },
      { name: 'content', label: 'Content', field: 'content', align: 'left' },

      {
        name: 'update',
        label: 'Update',
        field: 'update',
        align: 'center',
        sortable: false,
      },
      {
        name: 'delete',
        label: 'Delete',
        field: 'delete',
        align: 'center',
        sortable: false,
      },
    ];

    const pagination = {
      rowsPerPage: 50,
    };
    onMounted(fetchArticles);

    return {
      articles,
      columns,
      pagination,
      loading,
      deleteArticle,
      addArticle,
      updateArticle,
      newArticle,
      fetchArticles,
    };
  },
});
</script>
