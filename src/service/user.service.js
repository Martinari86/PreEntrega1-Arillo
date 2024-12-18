import userRepository from "../repositories/user.repository.js";
import {createHash, isValidPassword} from "../utils/util.js"
import CartModel from "../dao/models/cart.model.js";

class UserService{

        async registerUser(userData){
            //console.log("USER SERVICE: userData ",userData.email);
            
            const existingUser= await userRepository.getUserByEmail(userData.email);
            //console.log("USER SERVICE: Existe Usuario ",existingUser);
            
            //Creo un carrito nuevo
            //const nuevoCarrito = CartController.addCart
                const nuevoCarrito = new CartModel({products:[]});
                await nuevoCarrito.save

            if(existingUser) {
                throw new Error("El usuario ya existe");
            };

            //userData.cart= nuevoCarrito._id;        
            userData.password = createHash(userData.password);
            return await userRepository.createUser(userData)
        }
        
        async loginUser(email, password){
            //console.log("USER SERVICE: email ",email);
            //console.log("USER SERVICE: password ",password);
            const user = await userRepository.getUserByEmail(email)
           
            if(!user || !isValidPassword(password,user)){
                //console.log("USER SERVICE: user ",user);
                //console.log("USER SERVICE: user ",!isValidPassword(password,user));
                throw new Error ("Credenciales No Validas")
            }
            return user 
        }

        async getUserById(id){
            return await userRepository.getUserById(id)
        }

        async updateUser(id, userData){
            return await userRepository.updateUser(id,userData)
        }

        async deleteUser(id){
            return await userRepository.deleteUser(id)
        }
    
}

export default new UserService()