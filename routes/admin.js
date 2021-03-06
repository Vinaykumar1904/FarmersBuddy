const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const mongoose=require('mongoose')
AdminBro.registerAdapter(AdminBroMongoose)
const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
})
const ADMIN={
    email: process.env.ADMIN_EMAIL || 'admin@email.com',
    password: process.env.ADMIN_PASSWORD || 'admin'
}
const router=AdminBroExpress.buildAuthenticatedRouter(adminBro,{
    cookieName: process.env.ADMIN_EMAIL || 'admin@email.com',
    cookiePassword: process.env.ADMIN_PASSWORD || 'admin',
    authenticate: async(email,password)=>{
      if(email==ADMIN.email&&password==ADMIN.password) return ADMIN
      else return null
    }
})
module.exports=router