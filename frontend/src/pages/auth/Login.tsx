import { Form, Input } from "antd";
import MainLayout from "../../components/Layouts/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import { FormValues } from "../../types";
import { authService } from "../../services/authService";
import { toast } from "react-toastify";
import { useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../hooks";
import { setCredentials } from "../../features/Slicers/authSlice";

export default function Login() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    setLoading(true);
    const response = await authService.loginUser(values.email, values.password);
    console.log(response);
    if (response?.status === 200) {
      dispatch(setCredentials({ ...response?.data }));
      setLoading(false);
      toast.success("Logged in successfully");
      navigate("/");
    } else {
      toast.error(response?.response?.data?.errorMsg);
      setLoading(false);
    }
  };
  return (
    <MainLayout>
      <div className="bg-zinc-900 p-4 h-[100vh] w-full flex justify-between">
        <div className="flex flex-col justify-center items-center text-left w-full px-5 md:w-1/2 md:mx-auto lg:px-0 lg:w-1/2 lg:mx-auto">
          <h1 className="text-white font-bold text-3xl py-3 text-left items-start justify-start">
            Login
          </h1>
          <Form
            autoComplete="off"
            layout="vertical"
            className="w-full px-5 lg:px-0 lg:w-1/2 lg:mx-auto"
            onFinish={(values) => onFinish(values as FormValues)}
          >
            <Form.Item
              name="email"
              label={<label className="text-white font-light">Email</label>}
              rules={[
                { required: true, message: "This field is required" },
                { type: "email", message: "Please enter valid email address" },
              ]}
            >
              <Input
                rootClassName="rm-login-input-error"
                className="bg-zinc-900 w-full hover:bg-zinc-900 focus:bg-zinc-900 text-white"
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
                rootClassName="rm-login-input-error"
                className="w-full text-white"
                placeholder="Enter password"
              />
            </Form.Item>
            <Form.Item className="mt-2">
              <Button
                type="primary"
                htmlType="submit"
                className="w-full py-2 h-fit"
              >
                {loading ? (
                  <Spin
                    indicator={
                      <LoadingOutlined spin style={{ color: "white" }} />
                    }
                    size="small"
                  />
                ) : (
                  <p>Login</p>
                )}
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
