import React, { FC, useEffect, useState } from "react";
import Papa from "papaparse";
import {
  Button,
  Checkbox,
  Descriptions,
  Form,
  Image,
  Input,
  Modal,
  Select,
  Divider,
  Tag,
} from "antd";
import { GithubOutlined, LinkedinFilled } from "@ant-design/icons";
import { gapi } from "gapi-script";

import { GoogleSheetDataContainer } from "./style";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import CreateNewSheet from "../modals/create-new-sheet";
import Header from "../../component/header";
import PlacementIcon from "../../assets/Placement-icon";
import FilterIcon from "../../assets/Filter-icon";
import LocationIcon from "../../assets/Location-icon";
import GraduationIcon from "../../assets/Graduation-icon";
import ExperienceIcon from "../../assets/Experience-icon";
import SkillsIcon from "../../assets/Skills-icon";
import ProjectIcon from "../../assets/Project-icon";
import Login from "../../component/login/login";
import Logout from "../../component/logout/logout";
export interface SheetDataType {
  Profile_image: string;
  Name: string;
  Role: string;
  Location: string;
  Graduation_Year: string;
  Experience: string;
  Skills: string;
  Projects: string;
}
export interface SelectData {
  label: string;
  value: string;
}
export interface IGoogleSheetData {}

const CLIENT_ID =
  "201324902169-v3v4ne14cne6sb3vvgaltkl1dfeqp34c.apps.googleusercontent.com";
const API_KEY = "AIzaSyA4qcW-L5hrF31N6hMKijt90hQN2A3WSaI";
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

const GoogleSheetData: FC<IGoogleSheetData> = (_props) => {
  const [titleForm] = Form.useForm();
  const [studentInfoForm] = Form.useForm<SheetDataType[]>();
  const [googleSheetdata, setGoogleSheetdata] = useState<SheetDataType[]>([]);

  const [initialData, setInitialData] = useState<SheetDataType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [length, setLength] = useState(0);
  const [tagRole, setTagRole] = useState<string[]>([]);

  const getSheetData = () => {
    Papa.parse(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vQUP96fGa9ouZ24ovCld1dCnvZ0aSCdn7xA5SVhHSttxsNv7Fi5HLZjRPZJngbGGCwTkz7Cz90iOVmS/pub?output=csv",
      {
        download: true,
        header: true,
        complete: (results: any) => {
          setInitialData(results.data);
        },
      }
    );
  };

  useEffect(() => {
    getSheetData();
  }, []);

  useEffect(() => {
    if (initialData) {
      studentInfoForm.setFieldValue("studentInfoList", initialData);
      setLength(initialData.length);
    }
  }, [initialData]);

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: [
          "https://sheets.googleapis.com/$discovery/rest?version=v4",
        ],
        scope: SCOPES,
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const createGoogleSheet = () => {
    const Title = titleForm.getFieldsValue();
    if (Title.title) {
      var request = {
        properties: {
          title: Title.title,
        },
        sheets: [
          {
            properties: {
              title: "Sheet1",
              gridProperties: {
                columnCount: Object.keys(googleSheetdata[0]).length,
              },
            },
          },
        ],
      };

      gapi.client.sheets.spreadsheets.create(request).then((response: any) => {
        addDataValues(response);
        const url = response.result.spreadsheetUrl;
        window.open(url, "_blank");
      });
      setIsModalOpen(false);
      titleForm.resetFields();
    } else {
      alert("please enter title");
    }
  };

  const addDataValues = (response: any) => {
    const spreadSheetId = response.result.spreadsheetId;
    var valuesSheet1: any = [
      [
        "Profile_image",
        "Name",
        "Role",
        "Location",
        "Experience",
        "Graduation_Year",
        "Skills",
        "Projects",
      ],
    ];
    googleSheetdata.forEach((item: any) => {
      var row = [];
      row.push(item.Profile_image);
      row.push(item.Name);
      row.push(item.Role);
      row.push(item.Location);
      row.push(item.Experience);
      row.push(item.Graduation_Year);
      row.push(item.Skills);
      row.push(item.Projects);

      valuesSheet1.push(row);
    });

    var data = [];
    data.push({
      range: "Sheet1",
      values: valuesSheet1,
    });

    var body = {
      data: data,
      valueInputOption: "USER_ENTERED",
    };

    gapi.client.sheets.spreadsheets.values
      .batchUpdate({
        spreadsheetId: spreadSheetId,
        resource: body,
      })
      .then((response: any) => {
        const result = response.result;
      });
  };

  let tempArr: SheetDataType[] = [];

  const onChange = (e: CheckboxValueType[]) => {
    const arr = [...e] as number[];
    const data = studentInfoForm.getFieldValue("studentInfoList");
    arr.forEach((item) => {
      tempArr.push(data[item]);
    });

    setGoogleSheetdata(tempArr);
  };

  const Role_options: SelectData[] = [];

  initialData.forEach((item, index) => {
    if (!Role_options.some((val: SelectData) => val.label === item.Role)) {
      Role_options.push({
        label: item.Role,
        value: item.Role,
      });
    }
  });
  const Location_options: SelectData[] = [];

  initialData.forEach((item, index) => {
    if (
      !Location_options.some((val: SelectData) => val.label === item.Location)
    ) {
      Location_options.push({
        label: item.Location,
        value: item.Location,
      });
    }
  });
  const GraduationYear_options: SelectData[] = [];

  initialData.forEach((item, index) => {
    if (
      !GraduationYear_options.some(
        (val: SelectData) => val.label === item.Graduation_Year
      )
    ) {
      GraduationYear_options.push({
        label: item.Graduation_Year,
        value: item.Graduation_Year,
      });
    }
  });
  const Experience_options: SelectData[] = [];

  initialData.forEach((item, index) => {
    if (
      !Experience_options.some(
        (val: SelectData) => val.label === item.Experience
      )
    ) {
      Experience_options.push({
        label: item.Experience,
        value: item.Experience,
      });
    }
  });

  const handleRoleSearch = (value: string) => {
    if (!value) {
      getSheetData();
    } else {
      setTagRole([...tagRole, value]);
      let searchedStudentArray: SheetDataType[] = [];

      searchedStudentArray = initialData.filter((item, index) => {
        if (
          item.Role === value ||
          item.Experience === value ||
          item.Graduation_Year === value ||
          item.Location === value ||
          item.Name?.toLowerCase().includes(`${value.toLowerCase()}`)
        ) {
          return item;
        }
      });
      studentInfoForm.setFieldValue("studentInfoList", searchedStudentArray);

      setLength(studentInfoForm.getFieldValue("studentInfoList").length);
    }
  };
  const showModal = () => {
    if (googleSheetdata.length) {
      setIsModalOpen(true);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onCloseTag = (e: React.MouseEvent<HTMLElement>) => {
    // setTagRole()
    console.log(e);
  };

  return (
    <GoogleSheetDataContainer>
      <div className="header-container">
        <Header />
      </div>
      <div className="placement-container">
        <PlacementIcon />
        <div> {"PLACEMENT SUMMARY"}</div>
      </div>
      <div className="search-bar-container">
        <Input.Search onSearch={handleRoleSearch} />
      </div>
      <div className="filter-length-container">
        <div className="filter-container">
          <FilterIcon />
          <Select
            onChange={handleRoleSearch}
            value={"Role"}
            options={Role_options}
          />
          <Select
            onChange={handleRoleSearch}
            value={"Location"}
            options={Location_options}
          />
          <Select
            onChange={handleRoleSearch}
            value={"Graduation year"}
            options={GraduationYear_options}
          />
          <Select
            onChange={handleRoleSearch}
            value={"Experience"}
            options={Experience_options}
          />
        </div>
        <div>
          {length}&nbsp;&nbsp;
          {"candidates"}
        </div>
      </div>
      <div className="tagRole">
        {tagRole.map((item, index) => {
          return (
            <Tag closable onClose={onCloseTag}>
              {tagRole[index]}
            </Tag>
          );
        })}
      </div>
      {tagRole.length ? (
        <div className="Divider1">
          <Divider />
        </div>
      ) : (
        <></>
      )}

      <div className="student-list-container">
        <Form
          key={"jhjhjh"}
          form={studentInfoForm}
          name="student-information-form"
        >
          <Checkbox.Group onChange={onChange}>
            <Form.List name="studentInfoList">
              {(fields) => (
                <div>
                  {fields.map((field, index) => (
                    <div className="student-details-container">
                      <Checkbox
                        value={index}
                        key={`${field.key + index++}+${index}`}
                        className="checkbox-container"
                      >
                        <div className="profile-image-container">
                          <Form.Item
                            key={field.key}
                            name={[field.name, `Profile_image`]}
                            valuePropName="src"
                          >
                            <Image className="profile-image" />
                          </Form.Item>
                          <div className="social-media-icon">
                            <GithubOutlined />
                            <LinkedinFilled />
                          </div>
                        </div>

                        <div className="student-info-container">
                          <Form.Item
                            key={`${field.key + index++}+${index}`}
                            name={[field.name, `Name`]}
                            valuePropName="title"
                            className="name"
                          >
                            <Descriptions />
                          </Form.Item>
                          <Form.Item
                            key={`${field.key + index++}+${index}`}
                            name={[field.name, `Role`]}
                            valuePropName="title"
                            className="role"
                          >
                            <Descriptions />
                          </Form.Item>
                          <div className="location-graduation-experience-container">
                            <LocationIcon />
                            <Form.Item
                              key={`${field.key + index++}+${index}`}
                              name={[field.name, `Location`]}
                              valuePropName="title"
                              className="location"
                            >
                              <Descriptions />
                            </Form.Item>
                            <GraduationIcon />
                            <Form.Item
                              key={`${field.key + index++}+${index}`}
                              name={[field.name, `Graduation_Year`]}
                              valuePropName="title"
                              className="graduation_year"
                            >
                              <Descriptions />
                            </Form.Item>
                            <ExperienceIcon />
                            <Form.Item
                              key={`${field.key + index++}+${index}`}
                              name={[field.name, `Experience`]}
                              valuePropName="title"
                              className="experience"
                            >
                              <Descriptions />
                            </Form.Item>
                          </div>
                          <Divider />
                          <div className="skills-container">
                            <SkillsIcon />

                            <Form.Item
                              key={`${field.key + index++}+${index}`}
                              name={[field.name, `Skills`]}
                              valuePropName="title"
                              className="skills"
                            >
                              <Descriptions />
                            </Form.Item>
                          </div>
                          <div className="projects-container">
                            <ProjectIcon />
                            <Form.Item
                              key={`${field.key + index++}+${index}`}
                              name={[field.name, `Projects`]}
                              valuePropName="title"
                              className="projects"
                            >
                              <Descriptions />
                            </Form.Item>
                          </div>
                        </div>
                      </Checkbox>
                    </div>
                  ))}
                </div>
              )}
            </Form.List>
          </Checkbox.Group>
        </Form>
      </div>

      <div className="create-sheet-button-container">
        <Button
          onClick={showModal}
          disabled={googleSheetdata.length ? false : true}
        >
          create new sheet
        </Button>
      </div>
      <Modal
        title="create new sheet"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Login />,
          <Button
            onClick={() => {
              createGoogleSheet();
            }}
          >
            Create new Sheet
          </Button>,
          <Logout />,
        ]}
      >
        <CreateNewSheet titleForm={titleForm} />
      </Modal>
    </GoogleSheetDataContainer>
  );
};

export default GoogleSheetData;
