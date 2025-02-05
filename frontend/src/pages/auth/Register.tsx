import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../../components/Layouts/MainLayout";
import { Form, Input } from "antd";
import Button from "../../components/Buttons/Button";
import { FormValues } from "../../types";
import { authService } from "../../services/authService";
import { useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../hooks";
import { handleApiResponse } from "../../services/utils";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    const { username, email, password } = values;
    const response = await authService.registerUser(username, email, password);
    handleApiResponse(
      response,
      "Registeration failed",
      "User successfully registered",
      true,
      setLoading,
      dispatch,
      () => navigate("/"),
      () => console.error("Registration error")
    );
  };

  return (
    <MainLayout>
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
                disabled={loading}
              >
                {loading ? (
                  <Spin
                    indicator={
                      <LoadingOutlined spin style={{ color: "white" }} />
                    }
                    size="small"
                  />
                ) : (
                  <p>Register</p>
                )}
              </Button>
            </Form.Item>
            <div className="flex items-center gap-2">
              <p className="text-white">Already have an account?</p>
              <Link to="/login" className="text-pink hover:text-pink">
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
