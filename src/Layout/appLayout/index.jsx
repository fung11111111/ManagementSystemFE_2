import React, { useEffect } from "react";
import { Layout, Button, Row, Col } from "antd";
import NavBar from "../navBar";
import PageContainer from "../pageContainer";
import { useState, createContext } from "react";
import { getFieldLabelByLang } from "../../api/fieldMap";
import "./index.css";
const { Header, Content, Footer } = Layout;
export const InitContext = createContext(null);

const AppLayout = ({ children }) => {
  const [lang, setLang] = useState(true);
  const [fieldLabel, setFieldLabel] = useState([]);

  const initFieldLabel = () => {
    let language = "CH";
    if (!lang) {
      language = "ENG";
    }
    getFieldLabelByLang(language).then((rsp) => {
      if (rsp.data) {
        setFieldLabel(rsp.data);
      }
    });
  };
  useEffect(() => {
    initFieldLabel();
  }, [lang]);

  const changeLange = () => {
    let updateLang = !lang;
    setLang(updateLang);
  };
  return (
    <>
      <InitContext.Provider value={{ language: [lang, setLang], fieldLabel }}>
        <Layout className="layout" style={{ minHeight: "100vh" }}>
          <Header>
            <Row>
              <Col span={18}>
                <NavBar />
              </Col>
              <Col span={6}>
                <Button ghost onClick={() => changeLange()}>
                  ENG | 中文
                </Button>
              </Col>
            </Row>
          </Header>
          <Content>
            <div className="site-layout-content">
              <PageContainer>{children}</PageContainer>
            </div>
          </Content>
          <Footer>City Mangement ©2022 Created by F L</Footer>
        </Layout>
      </InitContext.Provider>
    </>
  );
};

export default AppLayout;
