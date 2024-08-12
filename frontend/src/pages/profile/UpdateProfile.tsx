import MainLayout from "../../components/Layouts/MainLayout";
import { Form, Input } from "antd";
import Button from "../../components/Buttons/Button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { FormValues } from "../../types";
import { toast } from "react-toastify";
import { userService } from "../../services/userService";
import { useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { handleApiResponse } from "../../services/utils";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    console.log(values);
    const { username, email, password } = values;
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      setLoading(true);
      if (userInfo) {
        const response = await userService.updateUserProfile(
          userInfo._id,
          username,
          email,
          password
        );
        console.log(response);
        handleApiResponse(
          response,
          "Unauthorized...Please login first..",
          "Profile updated successfully",
          true,
          setLoading,
          dispatch,
          () => {
            form.resetFields();
          },
          () => {
            if (response?.response?.status === 401) {
              toast.error("Unauthorized...Please login first..");
              navigate("/login");
            }
          }
        );
      }
    }
  };

  return (
    <MainLayout>
      <div className="bg-zinc-900 p-4 h-[100vh] w-full flex flex-col items-center justify-center">
        <div className="sm:w-1/2 w-3/4 mx-auto flex flex-col items-center justify-center">
          <h1 className="text-white font-bold text-2xl md:text-3xl py-3 text-left">
            Update Profile
          </h1>
          <Form
            form={form}
            autoComplete="off"
            layout="vertical"
            className="w-full px-5 lg:px-0 lg:w-1/2 lg:mx-auto"
            onFinish={(values) => onFinish(values as FormValues)}
          >
            <Form.Item
              name="username"
              label={<label className="text-white font-light">Name</label>}
              rules={[{ required: true, message: "This field is required" }]}
              initialValue={userInfo?.username}
            >
              <Input
                autoComplete="new-username"
                rootClassName="rm-input-error"
                className="bg-zinc-900 w-full hover:bg-zinc-900 focus:bg-zinc-900 text-white"
                placeholder="Enter name"
                value={userInfo?.username}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label={<label className="text-white font-light">Email</label>}
              rules={[
                { required: true, message: "This field is required" },
                { type: "email", message: "The email isn't valid" },
              ]}
              initialValue={userInfo?.email}
            >
              <Input
                autoComplete="new-email"
                rootClassName="rm-input-error"
                className="bg-zinc-900 w-full active:bg-zinc-900 hover:bg-zinc-900 focus:bg-zinc-900 text-white"
                placeholder="Enter email"
                value={userInfo?.email}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rootClassName="rm-password-field"
              label={<label className="text-white font-light">Password</label>}
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input.Password
                autoComplete="new-password"
                rootClassName="rm-input-error"
                className="w-full text-white"
                placeholder="Enter password"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rootClassName="rm-password-field"
              label={
                <label className="text-white font-light">
                  Confirm Password
                </label>
              }
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input.Password
                autoComplete="new-password"
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
                {loading ? (
                  <Spin
                    indicator={
                      <LoadingOutlined spin style={{ color: "white" }} />
                    }
                    size="small"
                  />
                ) : (
                  <p>Update</p>
                )}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </MainLayout>
  );
}
