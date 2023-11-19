import datetime
from http import HTTPStatus

from connexion import NoContent
from lib.models import Article, db
from sqlalchemy import extract


def datestring_to_date(datestring):
    try:
        return datetime.datetime.strptime(datestring, "%Y-%m-%d").date()
    except ValueError:
        return None


def date_to_datestring(date_object):
    try:
        return date_object.strftime("%Y-%m-%d")
    except AttributeError:
        return None


def get(user):
    articles = Article.query.filter(
        Article.author_user_id == user["user_id"]).all()

    return [
        {
            "article_id": article.article_id,
            "title": article.title,
            "content": article.content,
            "release_date": date_to_datestring(article.release_date),
        }
        for article in articles
    ], HTTPStatus.OK


def get_by_year(user, article_year):
    articles = Article.query.filter(
        Article.author_user_id == user["user_id"],
        extract("year", Article.release_date) == article_year,
    ).all()

    return [
        {
            "article_id": article.article_id,
            "title": article.title,
            "content": article.content,
            "release_date": date_to_datestring(article.release_date),
        }
        for article in articles
    ], HTTPStatus.OK


def post(user, body):
    release_date = datestring_to_date(body["release_date"])
    if release_date is None:
        return "Wrong date format", HTTPStatus.BAD_REQUEST

    db.session.add(
        Article(
            author_user_id=user["user_id"],
            title=body["title"],
            release_date=release_date,
            content=body["content"],
        )
    )
    db.session.commit()

    return NoContent, HTTPStatus.OK


def put(user, article_id, body):
    release_date = datestring_to_date(body["release_date"])
    if release_date is None:
        return "Wrong date format", HTTPStatus.BAD_REQUEST

    article = Article.query.filter(
        Article.article_id == article_id,
        Article.author_user_id == user["user_id"],
    ).first()

    if not article:
        return NoContent, HTTPStatus.NOT_FOUND

    article.title = body["title"]
    article.content = body["content"]
    article.release_date = release_date
    db.session.commit()

    return NoContent, HTTPStatus.OK


def delete(user, article_id):
    Article.query.filter(
        Article.article_id == article_id,
        Article.author_user_id == user["user_id"],
    ).delete()

    db.session.commit()

    return NoContent, HTTPStatus.OK
