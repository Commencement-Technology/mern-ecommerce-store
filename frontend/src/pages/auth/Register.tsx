import { Link } from "react-router-dom";
import MainLayout from "../../components/Layouts/MainLayout";
import { Form, Input } from "antd";
import Button from "../../components/Buttons/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FormValues } from "../../types";

export default function Register() {
  const onFinish = (values: FormValues) => {
    console.log(values);

    axios
      .post("http://localhost:5001/api/users/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      })
      .then(
        (response) => {
          console.log(response);
          if (response.status === 200) {
            toast.success("Signed up successfully!");
          }
        },
        (error) => {
          console.log(error);
          if (error && error.response && error.response.data) {
            if (error.response.status === 401) {
              toast.error("User data is not valid!");
            } else {
              toast.error("Oops! Some problem occured! Try again later..");
            }
          }
        }
      );
  };

  return (
    <MainLayout>
      <ToastContainer />
      <div className="bg-zinc-900 p-4 h-[100vh] w-full flex justify-between">
        <div className="flex flex-col justify-center items-center text-left w-full px-5 md:w-1/2 md:mx-auto lg:px-0 lg:w-1/2 lg:mx-auto">
          <h1 className="text-white font-bold text-3xl py-3 text-left items-start justify-start">
            Register
          </h1>
          <Form
            autoComplete="off"
            onFinish={(values) => onFinish(values as FormValues)}
            layout="vertical"
            className="w-full px-5 lg:px-0 lg:w-1/2 lg:mx-auto"
          >
            <Form.Item
              name="username"
              label={<label className="text-white font-light">Name</label>}
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input
                rootClassName="rm-input-error"
                className="bg-zinc-900 w-full hover:bg-zinc-900 focus:bg-zinc-900 text-white"
                placeholder="Enter name"
              />
            </Form.Item>
            <Form.Item
              name="email"
              label={<label className="text-white font-light">Email</label>}
              rules={[
                { required: true, message: "This field is required" },
                { type: "email", message: "The email isn't valid" },
              ]}
            >
              <Input
                rootClassName="rm-input-error"
                className="bg-zinc-900 w-full active:bg-zinc-900 hover:bg-zinc-900 focus:bg-zinc-900 text-white"
                placeholder="Enter email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rootClassName="rm-password-field"
              label={<label className="text-white font-light">Password</label>}
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input.Password
                rootClassName="rm-input-error"
                className="w-full text-white"
                placeholder="Enter password"
              />
            </Form.Item>
            <Form.Item className="mt-2">
              <Button
                className="py-2 h-fit w-full"
                type="primary"
                htmlType="submit"
              >
                Register
              </Button>
            </Form.Item>
            <div className="flex items-center gap-2">
              <p className="text-white">Already have an account?</p>
              <Link to="/login" className="text-pink-500 hover:text-pink-500">
                Login
              </Link>
            </div>
          </Form>
        </div>
        <img
          src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
          alt=""
          className="rounded-lg h-full w-1/2 lg:block hidden"
        />
      </div>
    </MainLayout>
  );
}
