<template>
    <v-stepper v-model="currentStep">
        <v-stepper-header v-if="!isUserLogged">
            <v-stepper-step
                :complete="currentStep > 1"
                step="1"
            >
                <span v-if="showRegister">Créer votre compte</span>
                <span v-else>Connection</span>
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
                :complete="currentStep > 2"
                step="2"
            >
                Vos informations de livraison
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">
                Payement sécurisé
            </v-stepper-step>
        </v-stepper-header>
        <v-stepper-header v-else>
            <v-stepper-step
                :complete="currentStep > 1"
                step="1"
            >
                Vos informations de livraison
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="2">
                Payement sécurisé
            </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items v-if="!isUserLogged">
            <v-stepper-content step="1" class="mt-5 mb-5">
                <v-card>
                    <div v-if="!showRegister && !showLogin" class="ml-16 mr-16">
                        <v-btn
                            class="cart-return-button mb-7"
                            color="#7c9473"
                            height="60px"
                            block
                            large
                            @click="showLogin = true"
                        >
                            <v-icon class="mr-2">
                                mdi-login-variant
                            </v-icon>
                            Se connecter
                        </v-btn>
                        <v-btn
                            class="cart-return-button"
                            color="#7c9473"
                            height="60px"
                            block
                            large
                            @click="showRegister = true"
                        >
                            <v-icon class="mr-2">
                                mdi-account-plus-outline
                            </v-icon>
                            Créer un compte
                        </v-btn>
                    </div>
                    <RegisterForm 
                        v-if="currentStep == 1 && showRegister" 
                        @goToLogin="showRegister = false; showLogin = true" 
                    />
                    <LoginForm 
                        v-if="currentStep == 1 && showLogin" 
                        @successLogin="successLogin = true; currentStep = 2;" 
                    />
                </v-card>
            </v-stepper-content>
        </v-stepper-items>
        <v-stepper-items>
            <v-stepper-content :step="isUserLogged && !successLogin ? 1 : 2">
                <v-card>
                    <DeliveryInfosForm 
                        v-if="isUserLogged && !successLogin ? currentStep == 1 : currentStep == 2" 
                        @deliveryInfosUpdateSuccess="isUserLogged && !successLogin ? currentStep = 2 : currentStep = 3" 
                    />
                </v-card>
            </v-stepper-content>
        </v-stepper-items>
        <v-stepper-items>
            <v-stepper-content :step="isUserLogged && !successLogin ? 2 : 3">
                <v-card>
                    <PaypalButton 
                        v-if="isUserLogged && !successLogin ? currentStep == 2 : currentStep == 3" 
                        @transactionCompleted="$emit('transactionCompleted')" 
                    />

                    <v-btn
                        class="cart-return-button"
                        color="#7c9473"
                        @click="isUserLogged && !successLogin ? currentStep = 1 : currentStep = 2"
                    >
                        <v-icon class="mr-2">
                            mdi-keyboard-return
                        </v-icon>
                        Retour
                    </v-btn>
                </v-card>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import DeliveryInfosForm from './DeliveryInfosForm'
import PaypalButton from './PaypalButton'

export default {
  components: { RegisterForm, LoginForm, DeliveryInfosForm, PaypalButton },
  props: {},
  data() {
    return {
        e1: 1,
        showRegister: false,
        showLogin: false,
        successLogin: false,
    };
  },
  computed: {
    isUserLogged() {
        return this.$store.state.isUserLogged;
    },
    currentStep: {
        get() {
            return this.e1;
        },
        set(value) {
            this.e1 = value;
        }
    },
  },
};
</script>
