FROM ubuntu:latest

RUN apt update && apt upgrade -y \
    && DEBIAN_FRONTEND=noninteractive apt install -y sudo git gnupg locales ca-certificates curl \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    NODE_MAJOR=18 echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list \
    apt update && DEBIAN_FRONTEND=noninteractive apt install -y nodejs \
    && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8 \
    && echo "LANG=en_US.utf8" >> /etc/environment \
    && groupadd devgroup \
    && useradd -g devgroup -m -s /bin/bash dev \
    && echo "dev ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers \
    && rm -rf /var/lib/apt/lists/*

USER dev

WORKDIR /workspace
