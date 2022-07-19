import {Project, Users} from '../models';

async function main() {
    for (const Model of [
        Users,
        Project
    ]) {
        console.log(Model);
        await Model.sync({alter: true});
    }
    const admin = await Users.findByPk(1)
    if (!admin) {
        const user = await
            Users.create({
                firstName: 'Rudik',
                lastName: 'Torosyan',
                gender: 'male',
                email: 'rudiktorosyan64@gmail.com',
                phoneNumber: '+37493087375',
                password: '123456',
                age: '23',
                avatar: ''
            })
        console.log(user)

    }

    process.exit(0);
}

main().catch(console.error);
