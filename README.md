

### API qui justifie un text en renvoyant des lignes de 80 caractères 

#### /api/token

* il faut d'abord créer un token en envoyant une requete en post avec une varialble du nom emailJson qui contien un JSON du forme {"email": "foo@bar.com" }

*  l'api renvoi un jwt valable pour 24 heures et un credit de 80000 mots 



#### /api/justify 

* envoyer en post le text à se faire justifier en body et le token en url parameter 

 * /api/justify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZvb0BiYXIuY29tIiwiaWF0IjoxNjA3MDc5MjUwLCJleHAiOjE2MDcxNjU2NTB9.v6u_hoWuK8r8FV6bhUy4C8ZM6ifTTZRoU5w2YdcbnWA
 
* api renvoi un tableau contenant d'une longeur de 80 caractères
* exception -- une ligne avec un seul mot n'aura que la longeur du mot.




