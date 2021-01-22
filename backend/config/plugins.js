module.exports = ({ env }) => ({
  email: {
    provider: "mailjet",
    providerOptions: {
      publicApiKey: env("MAILJET_PUBLIC_KEY"),
      secretApiKey: env("MAILJET_SECRET_KEY"),
    },
    settings: {
      defaultFrom: "fourmisland@outlook.com",
      defaultFromName: "FourmisLand",
      defaultTo: "fourmisland@outlook.com",
      defaultToName: "FourmisLand",
    },
  },
});
  