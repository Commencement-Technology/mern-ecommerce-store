import { Form, Input, Modal } from "antd";
import Button from "../../components/Buttons/Button";
import MainLayout from "../../components/Layouts/MainLayout";
import { useEffect, useState } from "react";
import { categoryService } from "../../services/categoryService";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { IApiResponse, ICategory } from "../../types";

export const Category = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCategoryCreated, setIsCategoryCreated] = useState<boolean>(false);
  const [isCategoryDeleted, setIsCategoryDeleted] = useState<boolean>(false);
  const [isCategoryUpdated, setIsCategoryUpdated] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [modalInputValue, setModalInputValue] = useState<string>("");
  const [form] = Form.useForm();

  const fetchAllCategories = async () => {
    setIsLoading(true);
    const res = await categoryService.getAllCategories();
    const { status, data } = res;
    if (status === 200) {
      setIsLoading(false);
      setCategories(data);
    } else {
      setIsLoading(false);
      console.log("Some error occured while fetching the categories");
    }
  };

  const handleApiResponse = (
    res: IApiResponse,
    successMessage: string,
    errorMessage: string,
    setLoadingState: (value: boolean) => void,
    onSuccessCallback?: () => void,
    formResetNeeded: boolean = false
  ) => {
    const { status } = res;
    if (status) {
      setLoadingState(false);
      toast.success(successMessage);
      fetchAllCategories();
      if (formResetNeeded) {
        form.resetFields();
      }
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } else {
      handleApiError(res, errorMessage, setLoadingState);
    }
  };

  const handleApiError = (
    res: IApiResponse,
    errorMessage: string,
    setLoadingState: (state: boolean) => void
  ) => {
    setLoadingState(false);
    const error = res?.response?.data?.error || errorMessage;
    toast.error(error);
  };

  const createCategory = async (values: any) => {
    const { category } = values;
    setIsCategoryCreated(true);
    const res = await categoryService.addCategory(category);
    handleApiResponse(
      res,
      "Category created successfully",
      "Error occured. Try again",
      setIsCategoryCreated,
      undefined,
      true
    );
  };

  const handleCategoryButtonClick = (category: ICategory) => {
    setIsModalOpen(true);
    setSelectedCategory(category);
    setModalInputValue(category.name);
  };

  const handleCategoryDelete = async () => {
    if (selectedCategory?.name === modalInputValue) {
      const id = selectedCategory?._id;
      setIsCategoryDeleted(true);
      const res = await categoryService.deleteCategory(id);
      handleApiResponse(
        res,
        "Category deleted successfully",
        "Category deletion failed..Try again",
        setIsCategoryDeleted,
        () => {
          setIsModalOpen(false);
          setSelectedCategory(null);
          setModalInputValue("");
        },
        false
      );
    } else {
      toast.error("Please provide the correct category.");
    }
  };

  const handleCategoryUpdate = async () => {
    const id = selectedCategory?._id;
    setIsCategoryUpdated(true);
    const res = await categoryService.updateCategory(id, modalInputValue);
    handleApiResponse(
      res,
      "Category updated successfully",
      "Category updation failed..Try again",
      setIsCategoryUpdated,
      () => {
        setIsModalOpen(false);
      },
      false
    );
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <MainLayout>
      <section className="bg-zinc-900 w-full min-h-screen flex flex-col items-start justify-start">
        <div className="md:px-24 flex flex-col gap-7 w-11/12 mx-auto md:max-w-7xl px-10 sm:max-w-md mt-12 md:mt-0">
          <h1 className="text-white mt-12 font-light text-2xl">
            Manage Categories
          </h1>
          <Form
            form={form}
            autoComplete="off"
            layout="vertical"
            onFinish={(values) => createCategory(values as ICategory)}
          >
            <Form.Item
              name="category"
              rootClassName="rm-category-input"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input placeholder="Write category name" />
            </Form.Item>
            <Form.Item>
              <Button
                disabled={isCategoryCreated}
                type="primary"
                htmlType="submit"
              >
                {isCategoryCreated ? (
                  <Spin
                    indicator={
                      <LoadingOutlined spin style={{ color: "white" }} />
                    }
                    size="small"
                  />
                ) : (
                  <p>Submit</p>
                )}
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="md:px-24 w-11/12 mx-auto md:max-w-7xl px-10 sm:max-w-md mt-3 mb-5">
          <hr style={{ border: "1px solid gray" }} />
        </div>
        <div className="md:px-24 flex flex-wrap gap-4 w-11/12 mx-auto md:max-w-7xl px-10 sm:max-w-md">
          {!isLoading && (
            <>
              {categories.map((category, index) => (
                <Button
                  key={index}
                  className="rounded py-4 font-light bg-black text-[#EC4899] border-[#EC4899]"
                  onClick={() => handleCategoryButtonClick(category)}
                >
                  {category.name}
                </Button>
              ))}
            </>
          )}
          {isLoading && (
            <>
              <p className="text-pink ">Loading...</p>
            </>
          )}
        </div>
        <Modal
          centered
          open={isModalOpen}
          rootClassName="rm-category-modal"
          onClose={() => setIsModalOpen(false)}
        >
          <Form className="mt-8">
            <Form.Item
              rootClassName="rm-category-modal-input"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input
                className="bg-black py-2 text-white"
                value={modalInputValue}
                onChange={(e) => setModalInputValue(e.target.value)}
              />
            </Form.Item>
            <div className="flex items-center gap-5">
              <Form.Item className="w-full">
                <Button
                  className="w-full py-5"
                  type="primary"
                  htmlType="submit"
                  onClick={handleCategoryUpdate}
                >
                  {isCategoryUpdated ? (
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
              <Form.Item className="w-full">
                <Button
                  className="rm-category-delete-btn w-full py-5"
                  onClick={handleCategoryDelete}
                  htmlType="submit"
                  type="primary"
                >
                  {isCategoryDeleted ? (
                    <Spin
                      indicator={
                        <LoadingOutlined spin style={{ color: "white" }} />
                      }
                      size="small"
                    />
                  ) : (
                    <p>Delete</p>
                  )}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Modal>
      </section>
    </MainLayout>
  );
};
