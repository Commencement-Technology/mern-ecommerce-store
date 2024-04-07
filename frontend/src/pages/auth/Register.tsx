import { Link } from "react-router-dom";
import MainLayout from "../../components/Layouts/MainLayout";
import { Button, Form, Input } from "antd";

export default function Register() {
  return (
    <MainLayout>
      <div className="bg-zinc-900 p-4 h-[100vh] w-full flex justify-between">
        <div className="flex flex-col justify-center items-center text-left w-full px-5 md:w-1/2 md:mx-auto lg:px-0 lg:w-1/2 lg:mx-auto">
          <h1 className="text-white font-bold text-3xl py-3 text-left items-start justify-start">
            Register
          </h1>
          <Form
            layout="vertical"
            className="w-full px-5 lg:px-0 lg:w-3/4 lg:mx-auto"
          >
            <Form.Item
              label={<label className="text-white font-light">Name</label>}
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input
                className="bg-zinc-900 w-full hover:bg-zinc-900 focus:bg-zinc-900 text-white"
                placeholder="Enter name"
              />
            </Form.Item>
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
