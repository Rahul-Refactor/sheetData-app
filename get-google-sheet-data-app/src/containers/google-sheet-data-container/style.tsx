import styled from "styled-components";

export const GoogleSheetDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .header-container {
    /* position: fixed; */
  }
  .placement-container {
    display: flex;
    align-items: center;
    padding: 0 10px 5px 10px;
    font-family: "Quicksand";
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    gap: 5px;
  }
  .search-bar-container {
    padding: 0 10px 5px 10px;
  }
  .filter-length-container {
    display: flex;
    justify-content: space-between;
    margin-right: 20px;
    .filter-container {
      display: flex;
      gap: 20px;
      padding: 0 10px 5px 10px;
    }
  }
  .student-list-container {
    padding: 0 10px 5px 10px;

    overflow-y: auto;
    height: calc(100vh - 311px);

    .student-details-container {
      display: flex;
      flex-direction: row;
      border: 1px solid #eaeaea;
      border-radius: 10px;
      margin-bottom: 10px;
      .checkbox-container {
        margin-left: 15px;
      }
      .profile-image-container {
        .social-media-icon {
          display: flex;
          gap: 15px;
          margin: 5px 5px 0px 25px;
        }
      }
      .ant-checkbox + span {
        padding-inline-start: 8px;
        display: flex;
        gap: 23px;

        .location-graduation-experience-container {
          display: flex;
          gap: 10px;
          align-items: baseline;
        }
      }
      .ant-descriptions-title {
        color: #000000;
        font-family: "Quicksand";
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
      }
      .name {
        .ant-descriptions-header {
          .ant-descriptions-title {
            font-family: "Quicksand";
            font-style: normal;
            font-weight: 600;
            font-size: 22px;
            line-height: 28px;
          }
        }
      }
      .role {
        .ant-descriptions-header {
          .ant-descriptions-title {
            font-family: "Quicksand";
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
          }
        }
      }
      .student-info-container {
        .skills-container {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .projects-container {
          display: flex;
          align-items: center;
          gap: 20px;
        }
      }
    }
  }

  .ant-checkbox-wrapper {
    display: flex;
  }
  .ant-descriptions-header {
    width: fit-content;
    margin-top: 10px;
    margin-bottom: 5px;
  }
  .ant-form-item .ant-form-item-control-input {
    /* position: relative; */
    display: flex;
    align-items: center;
    min-height: 0px;
  }
  .ant-image {
    margin: 10px;
    .ant-image-img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
  .ant-form-item {
    width: 10%;
  }
  .ant-divider-horizontal {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .Divider1 {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: -17px;
  }
  .tagRole {
    display: flex;
    margin-left: 10px;
    margin-right: 10px;
    .ant-tag {
      width: fit-content;
    }
  }
  .create-sheet-button-container {
    display: flex;
    margin-bottom: 0px;
    justify-content: center;
    margin: 0;

    .ant-btn {
      width: fit-content;
    }
  }
`;
