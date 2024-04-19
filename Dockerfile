FROM node:16-alpine as build-stage

WORKDIR /app
RUN corepack enable
RUN corepack prepare pnpm@7.32.1 --activate

RUN npm config set registry https://registry.npmmirror.com

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

ENV VITE_API_URL=http://10.9.114.7:5100

COPY . .
RUN pnpm install

CMD ["pnpm", "run", "dev"] 

# FROM nginx:stable-alpine as production-stage



# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80



# CMD ["nginx", "-g", "daemon off;"]