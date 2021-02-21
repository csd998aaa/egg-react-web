const { v4: UUIDV4 } = require('uuid');

module.exports = app => {
    const { STRING, UUID } = app.Sequelize;

    const Admin = app.model.define('admin', {
        id: {
            type: UUID,
            unique: true,
            primaryKey: true,
            defaultValue: UUIDV4().replace(/-/g, '')
        },

        nickname: {
            type: STRING,
            allowNull: false,
        },

        username: {
            type: STRING,
            allowNull: false,
        },

        password: {
            type: STRING,
            allowNull: false,

        },

        salt: {
            type: STRING,
            allowNull: false,

        },

    });
    
    Admin.sync({ force: false });

    Admin.findOne({ username: 'admin' }).then(async res => {
        if (!res) {
            const { md5, createSalt, md5Pwd } = app.util.jsMd5
            const password = md5('admin');
            const saltvalue = createSalt();
            await Admin.create({
                username: 'admin',
                password: md5Pwd(password, saltvalue),
                salt: saltvalue,
                nickname: '超级管理员',
            });
            console.log("Admin init done...");
        }
    })

    return Admin;
};