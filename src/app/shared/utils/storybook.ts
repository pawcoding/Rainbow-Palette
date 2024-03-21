import { InputSignal } from '@angular/core';
import { StoryObj } from '@storybook/angular';
import { ICollection } from '@storybook/angular/dist/client/types';

type InputStory<TComp> = Omit<StoryObj<TComp>, 'args'> & {
  props?: { [key in keyof TComp]: TComp[key] } | ICollection;
  // Enable signal inputs
  args?:
    | { [key in keyof TComp]: TComp[key] extends InputSignal<infer TSignalType> ? TSignalType : TComp[key] }
    | ICollection;
};

export function createStory<TComp>(story: InputStory<TComp>): StoryObj<TComp> {
  return {
    ...story,
    args: story.args as StoryObj<TComp>['args'],
    render: (args, context) => ({
      ...context,
      props: {
        ...args,
        ...story.args
      },
      template: story.render?.(args, context).template
    })
  };
}
