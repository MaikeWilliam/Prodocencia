FROM python:latest
WORKDIR /app

COPY requirements.txt /app/
RUN pip install -r /app/requirements.txt
COPY app.py /app/
COPY Tensor.py /app/


EXPOSE 5000
CMD ["python", "/app/app.py"]