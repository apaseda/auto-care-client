import { lazy, Suspense } from "react";
import {
  BrowserRouter as RouterWrapper,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import VerticalLayout from "../layouts/BlankLayout";
import { isUserLoggedIn } from "../utils/utils";
import LayoutWrapper from "../layouts/LayoutWrapper";
import { useRouterTransition } from "../utils/hooks/useRouterTransition";
import AllRoutes, {DefaultRoute} from "./pages";

const Router = () => {
  const DefaultLayout = "VerticalLayout";
  const [transition, setTransition] = useRouterTransition();

  const Layouts = { BlankLayout, VerticalLayout };

  const currentActiveItem = null;

  const Error = lazy(() => import("./pages/Error"));

  const FinalRoute = (props) => {
    const { route } = props;
    // let action, resource;

    // if (route.meta) {
    //   action = route.meta.action || null;
    //   resource = route.meta.resource || null;
    // }

    if (
      (!isUserLoggedIn() && route.meta === undefined) ||
      (!isUserLoggedIn() &&
        route.meta &&
        !route.meta.authRoute &&
        !route.meta.publicRoute)
    ) {
      return <Navigate to="/login" />;
    } else {
      return <route.component {...props} />;
    }
  };

  const LayoutRoutesAndPaths = (layout) => {
    const LayoutRoutes = [];
    const LayoutPaths = [];

    if (AllRoutes) {
      AllRoutes.forEach((route) => {
        // ** Checks if Route layout or Default layout matches current layout
        if (
          route.layout === layout ||
          (route.layout === undefined && DefaultLayout === layout)
        ) {
          LayoutRoutes.push(route);
          LayoutPaths.push(route.path);
        }
      });
    }

    return { LayoutRoutes, LayoutPaths };
  };

  const ResolveRoutes = () => {
    return Object.keys(Layouts).map((layout, index) => {
      const LayoutTag = Layouts[layout];

      const { LayoutPaths, LayoutRoutes } = LayoutRoutesAndPaths(layout);

      const routerProps = {};

      return (
        <Route path={LayoutPaths} key={index}>
          <LayoutTag
            routerProps={routerProps}
            layout={layout}
            transition={transition}
            setTransition={setTransition}
            currentActiveItem={currentActiveItem}
          >
            <Routes>
              {LayoutRoutes.map((route) => {
                return (
                  <Route
                    key={route.path}
                    paht={route.path}
                    exact={route.exact === true}
                    render={(props) => {
                      Object.assign(routerProps, {
                        ...props,
                        meta: route.meta,
                      });

                      return (
                        <Suspense fallback={null}>
                          <LayoutWrapper
                            layout={DefaultLayout}
                            transition={transition}
                            setTransition={setTransition}
                            {...(route.meta ? { routeMeta: route.meta } : {})}
                            {...(route.className
                              ? { wrapperClass: route.className }
                              : {})}
                          >
                            <FinalRoute route={route} {...props} />
                          </LayoutWrapper>
                        </Suspense>
                      );
                    }}
                  ></Route>
                );
              })}
            </Routes>
          </LayoutTag>
        </Route>
      );
    });
  };

  return (
    <RouterWrapper>
      <Routes>
        <Route exact path="/" render={() => {
            return <Navigate to={DefaultRoute} />
        }} />
        {ResolveRoutes()}
        <Route path="*" element={<Error />} />
      </Routes>
    </RouterWrapper>
  );
};

export default Router;
