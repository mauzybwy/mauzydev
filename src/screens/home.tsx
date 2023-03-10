/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";

import { useWindowDimensions } from "hooks/window";
import { useMobileCheck } from "hooks/mobile";
import { PageContainer } from "components/containers";
import colors from "style/colors";

const TRANSLATE_START = 170;
const TRANSLATE_AMT = 2000;

/*****************************************************************************
 * Default Component
 *****************************************************************************/
export default function Home () {
  const isMobile = useMobileCheck();
  const [state, setState] = useState<"init"|"about"|"portfolio"|"connect">("init");
  const [translate, setTranslate] = useState(TRANSLATE_START);

  const { width, height } = useWindowDimensions();

  const _boxWidth = {
    init: 250,
    about: 610,
    portfolio: 1200,
    connect: 610,
  }[state];
  const boxWidth = (isMobile && state !== "init") || _boxWidth > width - 64 ? width - 64 : _boxWidth;

  const _boxHeight = {
    init: 170,
    about: 340,
    portfolio: 600,
    connect: 600,
  }[state];
  const boxHeight = (isMobile && state !== "init" ) || _boxHeight > height - 64 ? height - 200 : _boxHeight;

  const [body, setBody] = useState(<Box />);
  const _body = {
    init: <Init />,
    about: <About />,
    portfolio: <Portfolio />,
    connect: <Connect />,
  }[state];

  useEffect(() => {
    setTranslate(0);
  }, [])

  useEffect(() => {
    if (translate !== TRANSLATE_START) {
      setTranslate(TRANSLATE_AMT);
    }
    setTimeout(() => {
      setBody(_body)
    }, 250);
  }, [state])

  useEffect(() => {
    if (translate) {
      setTimeout(() => {
        setTranslate(0);
      }, 250)
    }
  }, [translate])

  const updateState = (tab) => {
    setState(tab)
    // !blw: other stuff here
  }
  
  return (
    <PageContainer
      //style={{ border: `10px solid ${colors.light}`, boxSizing: "border-box" }}
    >
      <Box display="flex" justifyContent="center">
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="column" style={{ gap: "16px" }}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h5" className="interact disable-select" onClick={() => updateState("init")}>
                brandon wetzel
              </Typography>
            </Box>
            <Box display="flex" style={{ gap: "16px" }}>
              {["portfolio", "about",  "connect"].map(tab => (
                <Typography
                  key={tab}
                  className="interact disable-select"
                  onClick={() => updateState(tab)}
                  style={{ textDecoration: state === tab ? "underline" : undefined }}
                >
                  {tab}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box
            id="container"
            width={boxWidth}
            height={boxHeight}
            style={{
              border: `2px solid ${colors.accent}`,
              backgroundClip: "content-box",
              transition: "height 0.3s, width 0.6s",
              //transition: "all 1s",
              //transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1),",
              //transition: "all 0.5 ease-in",
              overflow: "hidden",
            }}
          >
            <Container innerRef={null} style={{ transform: `translateY(${translate}px)`, transition: "transform 1s" }}>
              {body}
            </Container>
            {/* {blah.map(item => (
                <Element name={item.id} style={{ width: "100%", height: "100%" }}>
                <Container innerRef={item.ref}>
                {item.body}
                </Container>
                </Element>
                ))} */}
          </Box>
        </Box>
      </Box>
    </PageContainer>
);
}

/*****************************************************************************
 * Helper Components
 *****************************************************************************/

const Init = () => {
  return (
    <Typography>
      hello there :)
    </Typography>
  );
}

const About = () => {
  const tabs = [
    {
      id: "hi",
      body: "i'm BRANDON and i make software. i've worked through all bands of the computing spectrum, and am currently focused on WEB and MOBILE applications.",
    },
    {
      id: "tech",
      body: "iOS - android - React - embedded - Linux"
    },
    {
      id: "edu",
      body: "BS Computer Engineering - University of Maryland, 2015",
    },
    {
      id: "jobs",
      body: "Texas Instruments Inc., AT&T",
    }
  ]
  
  return (
    <Box display="flex" style={{ alignSelf: "start" }}>
      <Box display="flex" flexDirection="column" style={{ gap: "16px" }}>
        {tabs.map(tab => (
          <Typography style={{ alignSelf: "start", fontWeight: 400 }}>
            <span style={{ fontWeight: 800 }}>~ {tab.id} ~</span>
            <br />
            {tab.body}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

const Portfolio = () => {
  return (
    <Typography style={{ alignSelf: "start" }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis. Volutpat blandit aliquam etiam erat velit scelerisque. Sodales ut eu sem integer vitae justo eget magna fermentum. Aliquet bibendum enim facilisis gravida neque. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Fringilla ut morbi tincidunt augue interdum velit. Metus dictum at tempor commodo ullamcorper a lacus vestibulum. Enim nec dui nunc mattis enim ut. Proin libero nunc consequat interdum varius. Sodales neque sodales ut etiam sit. Nec ultrices dui sapien eget mi proin sed libero enim. Viverra orci sagittis eu volutpat odio facilisis mauris sit amet.

Tincidunt vitae semper quis lectus nulla at. Dolor purus non enim praesent elementum. Bibendum est ultricies integer quis auctor elit sed vulputate mi. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Sit amet mauris commodo quis. At urna condimentum mattis pellentesque id nibh. Volutpat diam ut venenatis tellus in metus. Amet purus gravida quis blandit turpis. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Blandit aliquam etiam erat velit scelerisque in dictum non. Enim ut sem viverra aliquet eget.

Massa sed elementum tempus egestas sed sed. Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Elit scelerisque mauris pellentesque pulvinar pellentesque. Aenean pharetra magna ac placerat vestibulum. Leo duis ut diam quam nulla porttitor massa. Integer vitae justo eget magna fermentum iaculis eu non. Vulputate ut pharetra sit amet. Convallis aenean et tortor at risus viverra. Ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae. Massa ultricies mi quis hendrerit dolor magna eget. Enim diam vulputate ut pharetra sit amet. Etiam erat velit scelerisque in. Egestas sed sed risus pretium quam. Mi quis hendrerit dolor magna eget est lorem. Leo in vitae turpis massa. Nec ullamcorper sit amet risus nullam.

Enim praesent elementum facilisis leo vel fringilla est ullamcorper. Quisque non tellus orci ac auctor augue. Non nisi est sit amet. Malesuada proin libero nunc consequat interdum varius sit amet mattis. Aliquam malesuada bibendum arcu vitae elementum curabitur. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus. Volutpat odio facilisis mauris sit. Vehicula ipsum a arcu cursus vitae congue mauris rhoncus. Faucibus in ornare quam viverra orci. Nec tincidunt praesent semper feugiat nibh sed pulvinar. Morbi tincidunt ornare massa eget egestas purus viverra. Pellentesque elit eget gravida cum sociis natoque penatibus et. Enim nunc faucibus a pellentesque sit amet porttitor eget dolor.

Diam quis enim lobortis scelerisque. In pellentesque massa placerat duis ultricies. Dictum at tempor commodo ullamcorper. A pellentesque sit amet porttitor eget dolor morbi. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum. Pharetra diam sit amet nisl suscipit. Velit egestas dui id ornare. In hac habitasse platea dictumst vestibulum rhoncus. Odio ut sem nulla pharetra diam. Malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Eget lorem dolor sed viverra ipsum nunc aliquet. Massa eget egestas purus viverra accumsan in nisl nisi. Amet mauris commodo quis imperdiet massa tincidunt. Diam phasellus vestibulum lorem sed risus ultricies. Ipsum dolor sit amet consectetur adipiscing. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada.
    </Typography>
  );
}

const Connect = () => {
  return (
    <Typography style={{ alignSelf: "start" }}>
      CONNECT
    </Typography>
  );
}

const Container = ({ children, innerRef, style } : { children, innerRef?, style? }) => {
  return (
    <Box
      ref={innerRef}
      p="16px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      className="hide-scrollbar"
      style={{
        overflow: "scroll",
        transition: "all 0.25s",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </Box>
  );
}
