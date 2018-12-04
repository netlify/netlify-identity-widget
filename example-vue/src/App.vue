<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h3>Welcome to Netlify Identity Example in Vue.js</h3>
    <div v-if="isLoggedIn">
      <p>Hello, there! You have logged in successfully. Welcome!</p>
      <p>
        <button @click="triggerNetlifyIdentityAction('logout')">Log Out</button>
      </p>
    </div>
    <div v-else>
      <p>You are not logged in.</p>
      <p>
        <button @click="triggerNetlifyIdentityAction('login')">Log In</button>
        <button @click="triggerNetlifyIdentityAction('signup')">Sign Up</button>
      </p>
    </div>
    <ul>
      <li>
        <router-link :to="{name:'Home'}">Home Page</router-link>
      </li>
      <li>
        <router-link :to="{name:'Public'}">Public Page</router-link>
      </li>
      <li>
        <router-link :to="{name:'Protected'}">Protected Page</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  import Home from "@/components/Home";
  import Public from "@/components/Public";
  import Protected from "@/components/Protected";

  import netlifyIdentity from "netlify-identity-widget";

  import { mapGetters, mapActions } from "vuex";

  netlifyIdentity.init({
    // APIUrl:"https://xxx.netlify.com/.netlify/identity"
  });

  export default {
    name: "app",
    components: {
      Home,
      Public,
      Protected
    },
    computed: {
      ...mapGetters("user", {
        isLoggedIn: "getUserStatus"
      })
    },
    data: () => {
      return {};
    },
    methods: {
      ...mapActions("user", {
        updateUser: "updateUser"
      }),
      triggerNetlifyIdentityAction(action) {
        if (action == "login" || action == "signup") {
          netlifyIdentity.open(action);
          netlifyIdentity.on(action, user => {
            netlifyIdentity.close();
            this.updateUser({
              user: user
            });
          });
        } else if (action == "logout") {
          this.updateUser({
            user: null
          });
          netlifyIdentity.logout();
          this.$router.push({ name: "Home" });
        }
      }
    }
  };
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
