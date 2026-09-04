import React from 'react';
import { mergeConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';
import { PLUGIN_OPERATIONS, DIRECT_PLUGIN } from '@openedx/frontend-plugin-framework';
import {
  authenticatedUser, initializeMockApp, render, screen,
} from '../setupTest';
import { LearningHeader as Header } from '../index';

const V2_SLOT_ID = 'org.openedx.frontend.layout.learning_header_actions.v2';
const V2_WIDGET_TEXT = 'Test V2 Widget';

const configureV2Widget = () => {
  mergeConfig({
    pluginSlots: {
      [V2_SLOT_ID]: {
        keepDefault: true,
        plugins: [
          {
            op: PLUGIN_OPERATIONS.Insert,
            widget: {
              id: 'test_v2_widget',
              type: DIRECT_PLUGIN,
              priority: 10,
              RenderWidget: () => <span>{V2_WIDGET_TEXT}</span>,
            },
          },
        ],
      },
    },
  });
};

describe('Header', () => {
  beforeAll(async () => {
    // We need to mock AuthService to implicitly use `getAuthenticatedUser` within `AppContext.Provider`.
    await initializeMockApp();
  });

  it('displays user button', () => {
    render(<Header />);
    expect(screen.getByText(authenticatedUser.username)).toBeInTheDocument();
  });

  it('displays course data', () => {
    const courseData = {
      courseOrg: 'course-org',
      courseNumber: 'course-number',
      courseTitle: 'course-title',
    };
    render(<Header {...courseData} />);

    expect(screen.getByText(`${courseData.courseOrg} ${courseData.courseNumber}`)).toBeInTheDocument();
    expect(screen.getByText(courseData.courseTitle)).toBeInTheDocument();
  });

  it('hides the user dropdown and the header actions when showUserDropdown is false', () => {
    render(<Header showUserDropdown={false} />);

    expect(screen.queryByText(authenticatedUser.username)).not.toBeInTheDocument();
    expect(screen.queryByText('Help')).not.toBeInTheDocument();
  });

  it('renders v2 slot content for an authenticated user even when showUserDropdown is false', () => {
    configureV2Widget();
    render(<Header showUserDropdown={false} />);

    expect(screen.getByText(V2_WIDGET_TEXT)).toBeInTheDocument();
    expect(screen.queryByText(authenticatedUser.username)).not.toBeInTheDocument();
    expect(screen.queryByText('Help')).not.toBeInTheDocument();
  });

  it('renders v2 slot content for an anonymous user', () => {
    configureV2Widget();
    render(
      <AppContext.Provider value={{ authenticatedUser: null }}>
        <Header />
      </AppContext.Provider>,
    );

    expect(screen.getByText(V2_WIDGET_TEXT)).toBeInTheDocument();
    expect(screen.queryByText('Help')).not.toBeInTheDocument();
  });
});
