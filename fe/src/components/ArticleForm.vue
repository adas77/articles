<template>
  <div class="form-group">
    <q-input v-model="article.title" label="Title"></q-input>
  </div>
  <div class="form-group">
    <q-input v-model="article.content" label="Content"></q-input>
  </div>
  <div class="form-group">
    <q-input
      filled
      v-model="article.release_date"
      label="Release Date"
      mask="date"
      :rules="['date']"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date minimal v-model="article.release_date">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ArticleUpdate } from './models';

export default defineComponent({
  props: {
    newArticle: {
      type: Object as () => ArticleUpdate,
      required: true,
    },
  },
  setup(props) {
    const article = props.newArticle;
    return {
      article,
    };
  },
});
</script>
