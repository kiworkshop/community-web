import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { shallow } from "enzyme";
import { Container } from "next/app";
import Head from "next/head";
import MyApp from "pages/_app";
import theme from "src/common/presentation/components/theme";

const Component = (props: { dummy: string }) => <>{props.dummy}</>

describe("_app page test", () => {
  test("_app_ValidInput_ValidOutput", () => {
    const wrapper = shallow(<MyApp pageProps={{ dummy: "dummy" }} Component={Component as any} router={{} as any} />)

    expect(wrapper.contains(
      <Container>
        <Head>
          <title>My page</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component dummy="dummy" />
        </ThemeProvider>
      </Container>)
    ).toBe(true);
  })
})