import { Form, FormInstance, Input } from "antd";
import React, { FC } from "react";
import { CreateNewSheetContainer } from "./style";
export interface Titletype {
  title: string;
}
export interface IAddTitleModal {
  titleForm: FormInstance;
}

const CreateNewSheet: FC<IAddTitleModal> = (_props) => {
  const { titleForm } = _props;
  return (
    <CreateNewSheetContainer>
      <div>
        <Form form={titleForm} name="titleForm">
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please input Google Sheet Name!" },
            ]}
          >
            <Input placeholder="please enter Sheet title" />
          </Form.Item>
        </Form>
      </div>
    </CreateNewSheetContainer>
  );
};

export default CreateNewSheet;
