import os

from app import app
from lib.config import CONFIG
from lib.models import db, User, Article
from faker import Faker


def setup_db():
    if (
        "production" in os.getenv("APP_SETTINGS", "").lower()
        or CONFIG.ENVIRONMENT == "production"
    ):
        app.logger.error(
            "restore_staging_dataset cannot be used in production env!!!")
        exit()

    with app.app_context():
        db.drop_all()
        db.create_all()

        user = User(username="test", password="test")
        db.session.add(user)
        db.session.flush()

        fake = Faker()
        articles = [
            Article(
                author_user_id=user.user_id,
                title=fake.text(max_nb_chars=20),
                content=fake.text(max_nb_chars=200),
                release_date=fake.date_time(),
            )
            for _ in range(100)
        ]

        db.session.add_all(articles)

        db.session.commit()


if __name__ == "__main__":
    setup_db()
