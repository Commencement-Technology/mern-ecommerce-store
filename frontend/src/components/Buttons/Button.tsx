import { Button as AntButton, ConfigProvider } from "antd";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  type?: "default" | "link" | "primary" | "text" | "dashed" | undefined;
  htmlType?: "submit" | "button";
  onClick?: () => void;
};

export default function Button({
  children,
  className = "py-2",
  type = "primary",
  htmlType = "submit",
  onClick = () => {},
}: ButtonProps) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: "#EC4899",
            defaultActiveBg: "#EC4899",
            defaultBorderColor: "#EC4899",
            defaultColor: "#fff",
            defaultHoverBg: "#F472B6",
            defaultHoverColor: "#fff",
            defaultHoverBorderColor: "#F472B6",
            defaultActiveBorderColor: "#F472B6",
          },
        },
      }}
    >
      <AntButton
        className={className}
        onClick={onClick}
        htmlType={htmlType}
        type={type}
      >
        {children}
      </AntButton>
    </ConfigProvider>
  );
}
