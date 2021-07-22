import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, Input, Space, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useStore } from "../../helpers/use-store";

interface FormProps {
  username: string;
  password: string;
}

const Login = () => {
  const {
    uiStore: { authStore },
  } = useStore();
  const { t } = useTranslation();
  const { control, reset, handleSubmit } = useForm<FormProps>();

  useEffect(() => {
    reset({
      username: "",
      password: "",
    });
  }, [reset]);

  const login = async (data: FormProps) => {
    await authStore.login(data.username, data.password);
  };

  return (
    <div>
      <Typography.Title underline level={2}>
        {t("login")}
      </Typography.Title>
      <Card>
        <Space direction="vertical">
          <Typography.Text>{t("username")}</Typography.Text>
          <Controller
            name={`username`}
            control={control}
            render={({ field }) => (
              <Input onChange={field.onChange} value={field.value} />
            )}
          />
          <Typography.Text>{t("password")}</Typography.Text>
          <Controller
            name={`password`}
            control={control}
            render={({ field }) => (
              <Input onChange={field.onChange} value={field.value} />
            )}
          />
          <Button type="primary" onClick={handleSubmit(login)}>
            {t("login")}
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default Login;
