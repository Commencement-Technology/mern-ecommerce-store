import { Form, Input, Button } from "antd";
import MainLayout from "../../components/Layouts/MainLayout";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <MainLayout>
      <div className="bg-zinc-900 p-4 h-[100vh] w-full flex justify-between">
        <div className="flex flex-col justify-center items-center text-left w-full px-5 md:w-1/2 md:mx-auto lg:px-0 lg:w-1/2 lg:mx-auto">
          <h1 className="text-white font-bold text-3xl py-3 text-left items-start justify-start">
            Login
          </h1>
          <Form
            layout="vertical"
            className="w-full px-5 lg:px-0 lg:w-1/2 lg:mx-auto"
          >
            <Form.Item
              label={<label className="text-white font-light">Email</label>}
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input
                className="bg-zinc-900 w-full hover:bg-zinc-900 focus:bg-zinc-900 text-white"
                placeholder="Enter email"
              />
            </Form.Item>
            <Form.Item
              label={<label className="text-white font-light">Name</label>}
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input
                className="bg-zinc-900 w-full hover:bg-zinc-900 focus:bg-zinc-900 text-white"
                placeholder="Enter password"
              />
            </Form.Item>
            <Form.Item className="mt-2">
              <Button
                className="w-full bg-pink-500 text-white py-2 h-fit"
                type="primary"
              >
                Login
              </Button>
            </Form.Item>
            <div className="flex items-center gap-2">
              <p className="text-white">New Customer?</p>
              <Link
                to="/register"
                className="text-pink-500 hover:text-pink-500"
              >
                Register
              </Link>
            </div>
          </Form>
        </div>
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
          alt=""
          className="rounded-lg h-full w-1/2 lg:block hidden"
        />
      </div>
    </MainLayout>
  );
}
