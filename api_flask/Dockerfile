# Use uma imagem base oficial do Python mais recente
FROM python:latest

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo de requisitos
COPY requirements.txt /app/
# RUN pip install -r /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copia o restante dos arquivos da aplicação
COPY app.py /app/
COPY Tensor.py /app/

# porta que o aplicativo vai rodar
EXPOSE 5000

# Comando para rodar a aplicação usando waitress
# CMD ["python", "/app/app.py"]
CMD ["waitress-serve", "--host=0.0.0.0", "--port=5000", "app:app"]