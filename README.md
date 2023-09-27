** Question 1 **

HTTP/1.1 200 OK
Date: Fri, 22 Sep 2023 06:04:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked


** Question 2 **

HTTP/1.1 200 OK
Content-Type: application/json
Date: Fri, 22 Sep 2023 06:08:25 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Content-Length: 20

Nous Avons 2 nouveaux champs et 1 champs qui a disparu les champs "Content-Type" et "Content-Length" ont été ajouter alors que le champ "Transfer-Encoding" est disparu

** Question 3 **

il n'y a pas d'entete car le fichier index.html n'existe pas (il se nomme "__index.html" )

** Question 4 **


Voici l'erreur de la fonction :

[Error: ENOENT: no such file or directory, open 'C:\Users\coupd\.vscode\SEMESTRE4\SEMESTRE4\dev web\tp5\index.html'] {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'open',
  path: 'C:\\Users\\coupd\\.vscode\\SEMESTRE4\\SEMESTRE4\\dev web\\tp5\\index.html'
}

Voici la documentation de l'erreur ENOENT  sur le site nodejs.org (https://nodejs.org/api/errors.html#errorcode):

ENOENT (No such file or directory): Commonly raised by fs operations to indicate that a component of the specified pathname does not exist. No entity (file or directory) could be found by the given path.

Voici la fonction apres la modification puisque je ne peut pas acceder aux entetes car le fichier est introuvable j'affiche l'erreur dans la console . :

function requestListener(_request, response) {
  fs.readFile("index.html", "utf8")
    .then((contents) => {
      response.setHeader("Content-Type", "text/html");
      response.writeHead(200);
      return response.end(contents);
    })
    .catch(() => console.log(response.writeHead(500)));
}

** Question 5 **

Voici la version de la function avec les async et les awaits :

async function requestListener(_request, response) {
    try {
      const contents = await fs.promises.readFile("index.html", "utf8");
      response.setHeader("Content-Type", "text/html");
      response.writeHead(200);
      response.end(contents);
    } catch (error) {
      console.error(error);
      response.writeHead(500);
      response.end();
    }
  }

** Question 6 **

la commande "npm install cross-env --save" a ajouter une dependence dans package.json qui est : "cross-env": "^7.0.3"
puis elle a ajouter 7 package dans le package-lock.json que je ne vais pas vous montrer par pitier pour vos yeux 

la commande "npm install nodemon --save-dev" elle a ajouter 33 package que je ne vais encore moin vous montrer par peur que cela soit persus comme une nuisance a la personne .

SUite aux deux commandes un dossier nodes_modules a aussi été ajouter.

** Question 7 **

les differences entre les deux scripts "http-dev" et "http-prod" e t que le dev est en "mode" nodemon alors que le prod est en "mode" node et bien evidement le nom des deux environnements est different.



http://localhost:8000/index.html nous sort une 200 normale

http://localhost:8000/random.html nous sort une 200 et affiche nombre random entre 0 et 100

http://localhost:8000/ nous sort une 404

http://localhost:8000/dont-exist nous sort une 404

** Question 8 **

voici la nouvelle fonction :

async function requestListener(request, response) {
  response.setHeader("Content-Type", "text/html");
  try {
    const contents = await fs.readFile("index.html", "utf8");
    const urlParts = request.url.split("/");
    const route = urlParts[1];
    switch (route) {
      case "index.html":
        response.writeHead(200);
        return response.end(contents);
      case "/":
        response.writeHead(200);
        return response.end(contents);
      case "random":
        const nb = parseInt(urlParts[2].substring(1)); // Récupérer le paramètre :nb en tant qu'entier
        if (!isNaN(nb)) {
          let randomNumbers = [];
          for (let i = 0; i < nb; i++) {
            randomNumbers.push(Math.floor(100 * Math.random()));
          }
          response.writeHead(200);
          return response.end(`<html><p>${randomNumbers.join("<br>")}</p></html>`);
        } else {
          response.writeHead(400);
          return response.end(`<html><p>400: Bad Request</p></html>`);
        }
      default:
        response.writeHead(404);
        return response.end(`<html><p>404: NOT FOUND</p></html>`);
    }
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
  }
}




******************************* PARTIE 2 *******************************


** Question 1 **

URL express : https://www.npmjs.com/package/express
URL http-error : https://www.npmjs.com/package/http-errors
URL loglevel : https://www.npmjs.com/package/loglevel
URL Morgan : https://www.npmjs.com/package/morgan


** Question 2 **

Toute les routes marchent correctement.


** Question 3 **


entete index.html :

HTTP/1.1 200 OK
X-Powered-By: Express
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Fri, 22 Sep 2023 06:11:53 GMT
ETag: W/"3ac-18abb8423f9"
Content-Type: text/html; charset=UTF-8
Content-Length: 940
Date: Wed, 27 Sep 2023 06:57:29 GMT
Connection: keep-alive
Keep-Alive: timeout=5

entete / :

HTTP/1.1 200 OK
X-Powered-By: Express
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Fri, 22 Sep 2023 06:11:53 GMT
ETag: W/"3ac-18abb8423f9"
Content-Type: text/html; charset=UTF-8
Content-Length: 940
Date: Wed, 27 Sep 2023 06:58:01 GMT
Connection: keep-alive
Keep-Alive: timeout=5

entete random :

HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 1215
ETag: W/"4bf-U0tg1XH84BKTPkPVsNBCC1cCJQ4"
Date: Wed, 27 Sep 2023 06:54:09 GMT
Connection: keep-alive
Keep-Alive: timeout=5

dans les trois entetes nous avons une nouvelle ligne "X-Powered-By: Express"

** Question 4 **

l'evenement est declencher au lancement du server.

** Question 5 ** 

Par default le navigateur (si aucun chemin specifique n'est mis)il va automatiquement rechercher dans le dossier le fichier index.html et le servir si il est present.

** Question 6 ** 

si on rafraichit (CTRL + R) la page le fichier style.css va etre recuperer dans le cache donc un code 304 va etre envoyer 
mais si on force le rafraichissement (CTRL + SHIFT + R) alors la il va nous recuperer le fichier style.css et nous renvoyer une 200

Puisque je travaille avec le cache desactiver cela va toujours me renvoyer une 200

** Gestion d'erreur ** 

nous ajoutons le module grace a la commande : npm install --save htpp-errors

tout les changements et les corrections ont été faite dans le code directement 
