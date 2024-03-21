import { Meta, argsToTemplate } from '@storybook/angular';
import { createStory } from '../../utils/storybook';
import { AccordionComponent } from './accordion.component';

const meta: Meta<AccordionComponent> = {
  title: 'Shared/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
  argTypes: {
    hidden: {
      control: {
        type: 'boolean'
      }
    }
  }
};
export default meta;

export const Default = createStory<AccordionComponent>({
  args: {
    summary: 'Accordion summary',
    details:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
  }
});
export const Content = createStory({
  args: {
    summary: 'Accordion summary with content projection'
  },
  argTypes: {
    details: { control: { disable: true } }
  },
  render: (args) => ({
    template: `<rp-accordion ${argsToTemplate(args)} ><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p></rp-accordion>`
  })
});
