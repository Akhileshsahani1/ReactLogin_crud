import * as Yup from "yup";

export  const signUpSchema = Yup.object({
    name:Yup.string().min(2).max(25).required("Please Enter Your Name"),
    email:Yup.string().email().required("Please Enter Your Email"),
    password:Yup.string().min(6).max(16).required("Please Enter Your Password"),
    confirm_password:Yup.string().required().oneOf([Yup.ref('password'),null],"Password must match"),
}); 



export const loginSchema = Yup.object({
     email:Yup.string().email().required("Please enter your eamil"),
     password:Yup.string().min(6).max(10).required("please Enter your password"),
});

export const Editsave = Yup.object({
    name: Yup.string().min(2).max(16).required("please enter your name"),
    email: Yup.string().email().required("Please enter your eamil"),
    password: Yup.string().min(6).max(10).required("Please enter your password"),
  });
  
export const AddUsersave =  Yup.object({
    name:Yup.string().min(2).max(25).required("Please enter your name"),
    email:Yup.string().email().required("Plese enter your email"),
    password:Yup.string().min(6).max(10).required("Please enter your password")
}) 