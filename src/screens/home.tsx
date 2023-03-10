/*****************************************************************************
 * Import
 *****************************************************************************/
import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";

import { useWindowDimensions } from "hooks/window";
import { useMobileCheck } from "hooks/mobile";
import { PageContainer } from "components/containers";
import colors from "style/colors";

/*****************************************************************************
 * Default Component
 *****************************************************************************/
export default function Home () {
  const isMobile = useMobileCheck();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [state, setState] = useState<"init"|"about"|"portfolio"|"connect">("init");
  const [opacity, setOpacity] = useState(0);

  const { width, height } = useWindowDimensions();
  
  const handleScroll = (e) => {
    const target = e.target as HTMLTextAreaElement;
    console.log('Current scroll position:', target.scrollTop);
  };

  const _boxWidth = {
    init: 250,
    about: 610,
    portfolio: 1200,
    connect: 610,
  }[state];
  const boxWidth = _boxWidth > width - 64 ? width - 64 : _boxWidth;

  const _boxHeight = {
    init: 170,
    about: 340,
    portfolio: 600,
    connect: 600,
  }[state];
  const boxHeight = _boxHeight > height - 64 ? height - 64 : _boxHeight;

  const [body, setBody] = useState(<Box />);
  const _body = {
    init: <Init />,
    about: <About />,
    portfolio: <Portfolio />,
    connect: <Connect />,
  }[state];

  const initRef = useRef(null);
  const aboutRef = useRef(null);
  const portfolioRef = useRef(null);
  const connectRef = useRef(null);

  const blah = [
    {
      body: <Init />,
      ref: initRef,
    },
    {
      body: <About />,
      ref: aboutRef,
    },
    {
      body: <Portfolio />,
      ref: portfolioRef,
    },
    {
      body: <Connect />,
      ref: connectRef,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setBody(_body)
      setOpacity(1)
    }, 250);
  }, [state])

  const updateState = (tab) => {
    setState(tab)
    if (tab !== state) {
      setOpacity(0)
    }

    const onClick = {
      init: () => initRef.current.scrollIntoView({ behavior: "smooth" }),
      about: () => aboutRef.current.scrollIntoView({ behavior: "smooth" }),
      portfolio: () => portfolioRef.current.scrollIntoView({ behavior: "smooth" }),
      connect: () => connectRef.current.scrollIntoView({ behavior: "smooth" }),
    }[tab];

    setIntervalX(() => {
      onClick()
    }, 10, 75)    
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
              {["about", "portfolio", "connect"].map(tab => (
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
            width={boxWidth}
            height={boxHeight}
            style={{
              border: `2px solid ${colors.accent}`,
              backgroundClip: "content-box",
              transition: "height 0.3s, width 0.6s",
              //transition: "all 0.5 ease-in",
              overflow: "hidden",
            }}
          >
            {blah.map(item => (
              <Container innerRef={item.ref}>
                {item.body}
              </Container>
            ))}
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
  return (
    <Typography style={{ alignSelf: "start", fontWeight: "700" }}>
      hi, i'm BRANDON and i make software.
      <br />
      <br />
      i enjoy the process of making web and mobile applications of all kind
    </Typography>
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
      hello there :)
    </Typography>
  );
}

const Container = ({ children, innerRef }) => {
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
        //opacity: opacity,
        transition: "all 0.25s",
        boxSizing: "border-box",
      }}
    >
      {children}
    </Box>
  );
}

/*****************************************************************************
 * Helper Functions
 *****************************************************************************/

function setIntervalX(callback, delay, repetitions) {
  var x = 0;
  var intervalID = window.setInterval(function () {

    callback();

    if (++x === repetitions) {
      window.clearInterval(intervalID);
    }
  }, delay);
}
