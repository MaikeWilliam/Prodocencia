
# Use a imagem oficial do Node.js como a base
FROM node:latest AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY . .

# Compila a aplicação React
RUN npm run build

# Usa uma imagem do servidor web nginx para servir os arquivos estáticos
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80 

# ENV VITE_API_ENDPOINT="http://cloudhub.iprj.uerj.br/projeto2-1/"
ENV VITE_API_ENDPOINT="https://cloudhub.iprj.uerj.br/projeto2-1/"

# Comando para rodar o servidor web
CMD ["nginx", "-g", "daemon off;"]