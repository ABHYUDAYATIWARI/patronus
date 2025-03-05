FROM python:3.10

ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY . /app/

RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "your_project.wsgi:application"]
