FROM dunglas/frankenphp:php8.4

RUN install-php-extensions \
    pdo_mysql \
    mbstring \
    exif \
    gd \
    intl \
    zip \
    pcntl \
    bcmath \
    opcache

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY --from=node:22 /usr/local /usr/local

RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction

RUN npm install

RUN npm run build

RUN php artisan config:clear

RUN chown -R www-data:www-data storage bootstrap/cache
RUN chmod -R 775 storage bootstrap/cache

EXPOSE 80

CMD ["php", "artisan", "octane:frankenphp", "--host=0.0.0.0", "--port=80"]
