module.exports = ({ env }) =>{
    console.log(`configuration email ${env('EMAIL_DEFAULT')}`)
    return {
        email: {
            config: {
              provider: 'sendgrid',
              providerOptions: {
                apiKey: env('SENDGRID_API_KEY'),
              },
              settings: {
                defaultFrom: env('EMAIL_DEFAULT'),
                defaultReplyTo: env('EMAIL_DEFAULT'),
              },
            }
    }
    }
}


