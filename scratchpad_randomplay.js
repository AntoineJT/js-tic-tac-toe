/*
 * Ceci est une ardoise JavaScript.
 *
 * Saisissez du code JavaScript, puis faites un clic droit ou sélectionnez à partir du menu Exécuter :
 * 1. Exécuter pour évaluer le texte sélectionné (Ctrl+R),
 * 2. Examiner pour mettre en place un objet Inspector sur le résultat (Ctrl+I), ou,
 * 3. Afficher pour insérer le résultat dans un commentaire après la sélection. (Ctrl+L)
 */

bool=false;
while(!bool){
  bool=playCell(cells.item(randomCell()),plyteam);
}
plyteam=getOppositeTeam(plyteam);
/*
Exception: SyntaxError: redeclaration of let bool
@Scratchpad/3:1:1
*/