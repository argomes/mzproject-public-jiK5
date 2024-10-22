'use strict';

const parameter = require("../../parameter/controllers/parameter");

/**
 * contribute service
 */

module.exports = () => ({
    save_ko_fi: async(parameters) => {
        let {verification_token, type, from_name, email, timestamp, currency, amount} = parameters

        const constants = await strapi.documents('api::parameter.parameter').findFirst()
        const { kofi, value_per_day, kofi_type_description_donation, kofi_type_description_subscribe, minimum_monthly_amount } = constants
        
        if (kofi == verification_token) {
            const paid_at = timestamp
            const members = await fetch_members_by_email(email)
            
            let validate_date
            let contributions_type

            if (currency == 'USD') {
                const dollar_value = await fetch_dollar_value_day()
                amount = amount * dollar_value
            }

            if (type == kofi_type_description_donation) {
                
                validate_date = calculate_days_noation(amount, timestamp , value_per_day)
                contributions_type = 4
                
            } else if (type == kofi_type_description_subscribe) {
                validate_date = calculate_validate_date_monthly(amount, minimum_monthly_amount, paid_at, timestamp, value_per_day)
                contributions_type = 1
            } else {
                return "none"
            }

            if (!members || members.length == 0) {
                const member = {
                    from_name,
                    email,
                    paid_at,
                    validate_date,
                    contributions_type: 4,
                    parameters
                }
                return await save_member(member)
            } else {
                const member =  {
                    id : members[0].id,
                    documentId: members[0].documentId,
                    validate_date,
                    parameters,
                    paid_at
                }

                return await update_member(member)
            }
        
        } else {
            throw Error("invalid token ko-fi")
        }

    },

    save_live_pix: async(parameters) => {

    }
});

const calculate_days_noation = (amount, paid_at, value_per_day) => {
    const qnt_days = (amount) / value_per_day
    return addDays(paid_at , qnt_days)
}

const addMonth = (date) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + 1);
    return newDate.toISOString();
};

const addDays = (date, days) => {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result.toISOString();
}

const fetch_members_by_email = async (email) => {
    return await strapi.documents('api::member.member').findMany({
        filters:{
            $and:[{
                email: email
            }]
        },
        status: "published"
    })
}

const save_member = async (parameters) => {
    return await strapi.documents('api::member.member').create({
        data:{
            name: parameters.from_name,
            email: parameters.email,
            payment_date: parameters.paid_at,
            validate_date: parameters.validate_date,
            is_active: false,
            contributions_type: parameters.contributions_type,
            payload_contribution: parameters.parameters
        },
        status: "published"
    });
}

const update_member = async (parameters) => {
    await strapi.documents('api::member.member').update({ 
        documentId: parameters.documentId,
        data:{
            payment_date: parameters.paid_at,
            validate_date: parameters.validate_date,
            payload_contribution: parameters.parameters
        }
    })

    await strapi.documents('api::member.member').publish({
        documentId: parameters.documentId
    })

}

const fetch_dollar_value_day = async () => {
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json;odata.metadata=minimal");
    const date = new Date()
    const date_str = (`${(date.getMonth() + 1).toString().padStart(2,"0")}-${(date.getDate() - 1).toString().padStart(2,"0")}-${date.getFullYear()}`)

    const response = await fetch(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?%40dataCotacao='${date_str}'&%24format=json`, {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    })
    const json = await response.json()
    return json['value'][0]['cotacaoVenda']
}
function calculate_validate_date_monthly(amount, minimum_monthly_amount, paid_at, timestamp, value_per_day) {
    if (amount > minimum_monthly_amount) {
        const resto = amount - minimum_monthly_amount
        var month_value = addMonth(paid_at)
        return calculate_days_noation(resto, month_value, value_per_day)
    } else if (amount == minimum_monthly_amount) {
        return addMonth(paid_at)
    } else {
        return calculate_days_noation(amount, timestamp, value_per_day)
    }
}

