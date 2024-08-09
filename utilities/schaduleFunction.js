const UserModel = require("../models/index").users
const UserSubscriptions = require("../models/index").user_subscriptions

const checkUserSubscription = async () => {

    try{
        const users = await UserModel.findAll({

            where: {
                is_subscription_active: true
            },
            include: [
                {
                    model: UserSubscriptions,
                    order: [['createdAt', 'DESC']],
                    limit: 1,
                }
            ],
        })

        for(let i = 0; i < users.length; i++){
            const endDateString = users[i].user_subscriptions[0].end_date;

            // Convert the string to a Date object
            const endDate = new Date(endDateString);

            // Get today's date
            const today = new Date();


            // Compare endDate with today's date
            if (endDate <= today) {

                const updateResponse = await UserModel.update(
                    {
                        is_subscription_active: 0
                    },
                    {
                        where: {
                            id: users[i].id
                        }
                    }
                )

            } else {

            }
        }

    }catch (e) {
        console.warn("Something went wrong in updating user's subscription plan")
    }
}



module.exports = { checkUserSubscription }
