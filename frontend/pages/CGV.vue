<template>
    <div>
        <v-card class="mx-auto mt-5 mb-16" max-width="1300px" elevation="1" outlined>
            <v-container v-if="!error" class="product-container">
                <v-row no-gutters>
                    <v-col class="mt-2">
                        <v-card-title class="cgv-title">
                            Conditions générales de vente
                        </v-card-title>

                        <v-card-subtitle class="cgv-subtitle mt-3">
                            Conditions générales de vente des produits vendus sur www.fourmisland.com
                        </v-card-subtitle>

                        <v-card-text class="mt-12">
                            <h2 class="cgv-article-title">Article 1 - Objet</h2>

                            <p class="cgv-article-text mt-3">Les présentes conditions régissent les ventes d’insectes par la société l’Insecterie.</p>

                            <v-divider class="mt-8 mb-8"></v-divider>

                            <h2 class="cgv-article-title">Article 2 - Prix</h2>
                            
                            <p class="cgv-article-text mt-3">
                                Les prix de nos produits sont indiqués en euros toutes taxes comprises (TVA et autres taxes applicables au jour de la commande), sauf indication contraire et hors frais de traitement et d’expédition.

                                En cas de commande vers un pays autre que la France métropolitaine, vous êtes l’importateur du ou des produits concernés. Des droits de douane ou autres taxes locales ou droits d’importation ou taxes d’État sont susceptibles d’être exigibles. Ces droits et sommes ne relèvent pas du ressort de la société l’Insecterie. Ils seront à votre charge et relèvent de votre entière responsabilité, tant en termes de déclarations que de paiements aux autorités et organismes compétents de votre pays. Nous vous conseillons de vous renseigner sur ces aspects auprès de vos autorités locales.

                                Toutes les commandes, quelles que soient leurs origines, sont payables en euros.

                                La société l’Insecterie se réserve le droit de modifier ses prix à tout moment, mais le produit sera facturé sur la base du tarif en vigueur au moment de la validation de la commande et sous réserve de disponibilité.

                                Les produits demeurent la propriété de la société l’Insecterie jusqu’au paiement complet du prix.

                                Attention : dès que vous prenez possession physiquement des produits commandés, les risques de perte ou d’endommagement des produits vous sont transférés.
                            </p>

                            <v-divider class="mt-8 mb-8"></v-divider>

                            <h2 class="cgv-article-title">Article 3 - Commandes</h2>

                            <p class="cgv-article-text mt-3">
                                Vous pouvez passer commande :

                                Détailler les modalités choisies, par exemple :  

                                    Sur Internet : www.linsecterie.com

                                Les informations contractuelles sont présentées en langue française et feront l’objet d’une confirmation au plus tard au moment de la validation de votre commande.

                                La société l’Insecterie se réserve le droit de ne pas enregistrer un paiement et de ne pas confirmer une commande pour quelque raison que ce soit, et plus particulièrement en cas de problème d’approvisionnement, ou en cas de difficulté concernant la commande reçue.
                            </p>

                            <v-divider class="mt-8 mb-8"></v-divider>

                            <h2 class="cgv-article-title">Article 4 - Validation de votre commande</h2>

                            <p class="cgv-article-text mt-3">
                                Toute commande figurant sur le site Internet de l’Insecterie suppose l’adhésion aux présentes conditions générales. Toute confirmation de commande entraîne votre adhésion pleine et entière aux présentes conditions générales de vente, sans exception ni réserve.

                                L’ensemble des données fournies et la confirmation enregistrée vaudront preuve de la transaction.

                                Vous déclarez en avoir parfaite connaissance.

                                La confirmation de commande vaudra signature et acceptation des opérations effectuées.

                                Un récapitulatif des informations de votre commande et des présentes conditions générales vous sera communiqué au format PDF via l’adresse e-mail de confirmation de votre commande.
                            </p>

                            <v-divider class="mt-8 mb-8"></v-divider>

                            <h2 class="cgv-article-title">Article 5 - Paiement</h2>

                            <p class="cgv-article-text mt-3">
                                Le fait de valider votre commande implique pour vous l’obligation de payer le prix indiqué.

                                Le règlement de vos achats s’effectue par carte bancaire grâce au système sécurisé…

                                Le débit de la carte n’est effectué qu’au moment de l’expédition de la commande. En cas de livraisons fractionnées, seuls les produits expédiés sont débités.
                            </p>

                            <v-divider class="mt-8 mb-8"></v-divider>

                            <h2 class="cgv-article-title">Article 6 - Rétractation</h2>

                            <p class="cgv-article-text mt-3">
                                En raison du caractère spécifique de nos produits, aucun retour n’est accepté. Si la commande n’est pas expédiée, envoyez simplement un e-mail pour demander l’annulation.
                            </p>

                            <v-divider class="mt-8 mb-8"></v-divider>

                            <h2 class="cgv-article-title">Article 7- Disponibilité</h2>

                            <p class="cgv-article-text mt-3">
                                Nos produits sont proposés tant qu’ils sont visibles sur le site de l’Insecterie et dans la limite des stocks disponibles.

                                En cas d’indisponibilité de produit après passation de votre commande, nous vous en informerons par e-mail. Votre commande sera automatiquement annulée et aucun débit bancaire ne sera effectué.

                                En outre, le site Internet de l’Insecterie n’a pas vocation à vendre ses produits en quantités importantes. Par conséquent, la société l’Insecterie se réserve le droit de refuser les commandes de 10 articles identiques.
                            </p>

                            <v-divider class="mt-8 mb-8"></v-divider>

                            <h2 class="cgv-article-title">Article 8 - Livraison</h2>

                            <p class="cgv-article-text mt-3">
                                Les produits sont livrés à l’adresse de livraison indiquée au cours du processus de commande, dans le délai indiqué sur la page de validation de la commande.

                                En cas de retard d’expédition, un mail vous sera adressé pour vous informer d’une éventuelle conséquence sur le délai de livraison qui vous a été indiqué.

                                En cas de livraison par un transporteur, la société l’Insecterie ne peut être tenue pour responsable d’un retard de livraison dû exclusivement à une indisponibilité du client après plusieurs propositions de rendez-vous.
                            </p>

                            <v-divider class="mt-8 mb-8"></v-divider>

                            <h2 class="cgv-article-title">Article 9 - Garantie</h2>

                            <p class="cgv-article-text mt-3">
                                Tous nos produits bénéficient de la garantie légale de conformité et de la garantie des vices cachés, prévues par les articles 1641 et suivants du Code civil. En cas de non-conformité d’un produit vendu, il pourra être retourné, échangé ou remboursé.

                                Toutes les réclamations, demandes d’échange ou de remboursement doivent s’effectuer par e-mail immédiatement après la réception des insectes. 

                                Les dispositions de cet Article ne vous empêchent pas de bénéficier du droit de rétractation prévu à l’article 6.
                            </p>

                            <v-divider class="mt-8 mb-8"></v-divider>

                            <h2 class="cgv-article-title">Article 10 - Responsabilité</h2>

                            <p class="cgv-article-text mt-3">
                                Les produits proposés sont conformes à la législation française en vigueur. La responsabilité de la société l’Insecterie ne saurait être engagée en cas de non-respect de la législation du pays où le produit est livré. Il vous appartient de vérifier auprès des autorités locales les possibilités d’importation ou d’utilisation des produits ou services que vous envisagez de commander.

                                Par ailleurs, la société l’Insecterie ne saurait être tenue pour responsable des dommages résultant d’un mauvais traitement des insectes achetés.

                                Enfin, la responsabilité de la société l’Insecterie ne saurait être engagée pour tous les inconvénients ou dommages inhérents à l’utilisation du réseau Internet, notamment une rupture de service, une intrusion extérieure ou la présence de virus informatiques.
                            </p>

                            <v-divider class="mt-8 mb-8"></v-divider>

                            <h2 class="cgv-article-title">Article 11 - Droit applicable en cas de litiges</h2>

                            <p class="cgv-article-text mt-3">
                                La langue du présent contrat est la langue française. Les présentes conditions de vente sont soumises à la loi française. En cas de litige, les tribunaux français seront les seuls compétents.
                            </p>

                            <v-divider class="mt-8 mb-8"></v-divider>

                            <h2 class="cgv-article-title">Article 12 - Propriété intellectuelle</h2>

                            <p class="cgv-article-text mt-3">
                                Tous les éléments du site de l’Insecterie sont et restent la propriété intellectuelle et exclusive de la société l’Insecterie. Nul n’est autorisé à reproduire, exploiter, rediffuser, ou utiliser à quelque titre que ce soit, même partiellement, des éléments du site qu’ils soient logiciels, visuels ou sonores. Tout lien simple ou par hypertexte est strictement interdit sans un accord écrit express de la société l’Insecterie.
                            </p>

                            <v-divider class="mt-8 mb-8"></v-divider>

                            <h2 class="cgv-article-title">Article 13 - Données personnelles</h2>

                            <p class="cgv-article-text mt-3">
                                La société l’Insecterie se réserve le droit de collecter les informations nominatives et les données personnelles vous concernant. Elles sont nécessaires à la gestion de votre commande, ainsi qu’à l’amélioration des services et des informations que nous vous adressons.

                                Elles peuvent aussi être transmises aux sociétés qui contribuent à ces relations, telles que celles chargées de l’exécution des services et commandes pour leur gestion, exécution, traitement et paiement.

                                Ces informations et données sont également conservées à des fins de sécurité, afin de respecter les obligations légales et réglementaires.

                                Conformément à la loi du 6 janvier 1978, vous disposez d’un droit d’accès, de rectification et d’opposition aux informations nominatives et aux données personnelles vous concernant, directement sur le site Internet.
                            </p>

                            <v-divider class="mt-8 mb-8"></v-divider>

                            <h2 class="cgv-article-title">Article 14 - Archivage Preuve</h2>

                            <p class="cgv-article-text mt-3">
                                La société l’Insecterie archivera les bons de commande et les factures sur un support fiable et durable constituant une copie fidèle conformément aux dispositions de l’article 1348 du Code civil.

                                Les registres informatisés de la société l’Insecterie seront considérés par toutes les parties concernées comme preuve des communications, commandes, paiements et transactions intervenus entre les parties.
                            </p>
                        </v-card-text>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </div> 
</template>

<script>
export default {
  components: {},
  props: {
  },
  data() {
    return {};
  },
};
</script>