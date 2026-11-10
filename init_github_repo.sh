#!/usr/bin/env bash
set -e

REPO_NAME="${1:-checkmate}"
VISIBILITY="${2:---public}"

echo "🚀 Verificando historial de commits de ingeniería en $REPO_NAME..."
git log --oneline -n 5

if command -v gh &> /dev/null; then
  echo "🔗 Creando y publicando el repositorio $REPO_NAME en tu cuenta de GitHub ($VISIBILITY)..."
  gh repo create "$REPO_NAME" "$VISIBILITY" --source=. --remote=origin --push
  echo "✅ ¡Repositorio CheckMate publicado exitosamente en GitHub!"
else
  echo "ℹ️ Para subir este repositorio (con sus commits intactos) a tu cuenta de GitHub, ejecuta:"
  echo "   git remote add origin https://github.com/TU_USUARIO/$REPO_NAME.git"
  echo "   git push -u origin main"
fi
