1. Téléchargement du fichier .tar
   - Comprendre comment fonctionne Docker layers (https://dominikbraun.io/blog/docker/docker-images-and-their-layers-explained/)
2. Importer le fichier React & Python pour le frontend/backend/database
   - Attention au `node_modules` non à jour => run `npm install`pour mettre à jour le `node_modules`
3. Problème avec la requête CORS (Cross Origin Resource Sharing): browser n'autorise pas à se connecter entre deux adresses locales de même origine => need to change `"Access-Control-Allow-Origin": "*"` ?
   => method doit impérativement venir du server
4. Bloqué, changement de méthode: explorer les layers de `aircraftdetector.tar` et trouver 2 fichiers:

- `app` => avec le model provenant de torch.yolov
- `requirements.txt` => permet d'installer toutes les dépendences que nécessitent YOLO

5. ATTENTION: python3.8:alpine n'a pas nativement 2 éléments dont SciPy se sert: BLAS & LABLAS
   => SOLUTION: `RUN apk add --no-cache --update-cache gfortran build-base wget libpng-dev openblas-dev && apk add postgresql-dev build-base py3-scipy` dans le `DockerFile` du `backend` pour installer ces dependencies

6. Après plusieurs complications niveau dependencies, server tourne MAIS il manque le model`best.onnx`
   => continuer la recherche dans les layers puis importer dans l'api
