import { TestElement } from '@angular/cdk/testing';
import { AppDemoFormHarness, AppHarness } from './app.harness';
import { AsyncEmulateKey, SharedSpecContext } from './shared-spec-context.model';

export function testEmulateArrows(
  context: SharedSpecContext,
) {
  let app: AppHarness;
  let emulateKey: AsyncEmulateKey;
  let demoForm: AppDemoFormHarness;

  beforeEach(async () => {
    app = context.app;
    emulateKey = context.emulateKey;
    demoForm = await app.getDemoFrom();
  });

  describe('up', () => {
    describe('in text input', () => {
      let textInput: TestElement;

      beforeEach(async () => {
        textInput = await demoForm.getControl('first input');
        await textInput.focus();
      });

      describe('that is empty', () => {
        it('should do nothing', async () => {
          await emulateKey.arrow.up();

          expect(await textInput.getProperty('selectionStart')).toBe(0, 'selection start');
          expect(await textInput.getProperty('selectionEnd')).toBe(0, 'selection end');
        });
      });

      describe('that contains text', () => {
        beforeEach(() => context.setValue('12345'));

        describe('with cursor at end', () => {
          beforeEach(() => context.setCursor(5));

          it('should move cursor to the start', async () => {
            await emulateKey.arrow.up();

            expect(await textInput.getProperty('selectionStart')).toBe(0, 'selection start');
            expect(await textInput.getProperty('selectionEnd')).toBe(0, 'selection end');
          });
        });

        describe('with cursor at start', () => {
          beforeEach(() => context.setCursor(0));

          it('should do nothing', async () => {
            await emulateKey.arrow.up();
            expect(await textInput.getProperty('selectionStart')).toBe(0, 'selection start');
            expect(await textInput.getProperty('selectionEnd')).toBe(0, 'selection end');
          });
        });

        describe('with cursor somewhere in the middle', () => {
          beforeEach(() => context.setCursor(4));

          it('should cursor to the start', async () => {
            await emulateKey.arrow.up();
            expect(await textInput.getProperty('selectionStart')).toBe(0, 'selection start');
            expect(await textInput.getProperty('selectionEnd')).toBe(0, 'selection end');
          });
        });
      });
    });

    describe('in text area', () => {
      let textArea: TestElement;

      beforeEach(async () => {
        textArea = await demoForm.getControl('textarea');
        await textArea.focus();
      });

      describe('that is empty', () => {
        it('should do nothing', async () => {
          await emulateKey.arrow.up();

          expect(await textArea.getProperty('selectionStart')).toBe(0, 'selection start');
          expect(await textArea.getProperty('selectionEnd')).toBe(0, 'selection end');
        });
      });

      describe('that contains text fitting in one row', () => {
        beforeEach(() => context.setValue('12345'));

        describe('with cursor at end', () => {
          beforeEach(() => context.setCursor(5));

          it('should move cursor to the start', async () => {
            await emulateKey.arrow.up();

            expect(await textArea.getProperty('selectionStart')).toBe(0, 'selection start');
            expect(await textArea.getProperty('selectionEnd')).toBe(0, 'selection end');
          });
        });

        describe('with cursor at start', () => {
          beforeEach(() => context.setCursor(0));

          it('should do nothing', async () => {
            await emulateKey.arrow.up();
            expect(await textArea.getProperty('selectionStart')).toBe(0, 'selection start');
            expect(await textArea.getProperty('selectionEnd')).toBe(0, 'selection end');
          });
        });

        describe('with cursor somewhere in the middle', () => {
          beforeEach(() => context.setCursor(4));

          it('should cursor to the start', async () => {
            await emulateKey.arrow.up();
            expect(await textArea.getProperty('selectionStart')).toBe(0, 'selection start');
            expect(await textArea.getProperty('selectionEnd')).toBe(0, 'selection end');
          });
        });
      });

      describe('that contains multiple lines of text', () => {
        const oneLine = '12345678901234567';
        const multipleLines = oneLine + oneLine + oneLine;
        beforeEach(async () => {
          await context.setValue(multipleLines);
          await context.setCursor(multipleLines.length);
        });

        it('should move round about one line', async () => {
          await emulateKey.arrow.up();

          expect(await textArea.getProperty('selectionStart')).toBeGreaterThan(oneLine.length, 'selection start > 0');
          expect(await textArea.getProperty('selectionEnd')).toBeGreaterThan(oneLine.length, 'selection end > 0');

          expect(await textArea.getProperty('selectionStart')).toBeLessThan(multipleLines.length - 4, 'selection start < length');
          expect(await textArea.getProperty('selectionEnd')).toBeLessThan(multipleLines.length - 4, 'selection end < length');
        });
      });
    });
  });

  describe('down', () => {
    describe('in text input', () => {
      let textInput: TestElement;

      beforeEach(async () => {
        textInput = await demoForm.getControl('first input');
        await textInput.focus();
      });

      describe('that is empty', () => {
        it('should do nothing', async () => {
          await emulateKey.arrow.down();

          expect(await textInput.getProperty('selectionStart')).toBe(0, 'selection start');
          expect(await textInput.getProperty('selectionEnd')).toBe(0, 'selection end');
        });
      });

      describe('that contains text', () => {
        beforeEach(() => context.setValue('12345'));

        describe('with cursor at end', () => {
          beforeEach(() => context.setCursor(5));

          it('should do nothing', async () => {
            await emulateKey.arrow.down();

            expect(await textInput.getProperty('selectionStart')).toBe(5, 'selection start');
            expect(await textInput.getProperty('selectionEnd')).toBe(5, 'selection end');
          });
        });

        describe('with cursor at start', () => {
          beforeEach(() => context.setCursor(0));

          it('should move cursor to the end of text', async () => {
            await emulateKey.arrow.down();
            expect(await textInput.getProperty('selectionStart')).toBe(5, 'selection start');
            expect(await textInput.getProperty('selectionEnd')).toBe(5, 'selection end');
          });
        });

        describe('with cursor somewhere in the middle', () => {
          beforeEach(() => context.setCursor(3));

          it('should cursor to the end of text', async () => {
            await emulateKey.arrow.down();
            expect(await textInput.getProperty('selectionStart')).toBe(5, 'selection start');
            expect(await textInput.getProperty('selectionEnd')).toBe(5, 'selection end');
          });
        });
      });
    });

    describe('in text area', () => {
      let textArea: TestElement;

      beforeEach(async () => {
        textArea = await demoForm.getControl('textarea');
        await textArea.focus();
      });

      describe('that is empty', () => {
        it('should do nothing', async () => {
          await emulateKey.arrow.down();

          expect(await textArea.getProperty('selectionStart')).toBe(0, 'selection start');
          expect(await textArea.getProperty('selectionEnd')).toBe(0, 'selection end');
        });
      });

      describe('that contains text fitting in one row', () => {
        beforeEach(() => context.setValue('12345'));

        describe('with cursor at end', () => {
          beforeEach(() => context.setCursor(5));

          it('should do nothing', async () => {
            await emulateKey.arrow.down();

            expect(await textArea.getProperty('selectionStart')).toBe(5, 'selection start');
            expect(await textArea.getProperty('selectionEnd')).toBe(5, 'selection end');
          });
        });

        describe('with cursor at start', () => {
          beforeEach(() => context.setCursor(0));

          it('should move cursor to the end of text', async () => {
            await emulateKey.arrow.down();
            expect(await textArea.getProperty('selectionStart')).toBe(5, 'selection start');
            expect(await textArea.getProperty('selectionEnd')).toBe(5, 'selection end');
          });
        });

        describe('with cursor somewhere in the middle', () => {
          beforeEach(() => context.setCursor(3));

          it('should move cursor to the end of text', async () => {
            await emulateKey.arrow.down();
            expect(await textArea.getProperty('selectionStart')).toBe(5, 'selection start');
            expect(await textArea.getProperty('selectionEnd')).toBe(5, 'selection end');
          });
        });
      });

      describe('that contains multiple lines of text', () => {
        const oneLine = '12345678901234567';
        const multipleLines = oneLine + oneLine + oneLine;
        beforeEach(async () => {
          await context.setValue(multipleLines);
          await context.setCursor(0);
        });

        it('should move round about one line', async () => {
          /* istanbul ignore if */
          if (process.env.bug_multipleArrows) {
            pending(process.env.bug_multipleArrows);
          }
          await emulateKey.arrow.down();

          expect(await textArea.getProperty('selectionStart')).toBeGreaterThan(4, 'selection start > 0');
          expect(await textArea.getProperty('selectionEnd')).toBeGreaterThan(4, 'selection end > 0');

          expect(await textArea.getProperty('selectionStart')).toBeLessThan(multipleLines.length - oneLine.length, 'selection start < length');
          expect(await textArea.getProperty('selectionEnd')).toBeLessThan(multipleLines.length - oneLine.length, 'selection end < length');
        });
      });
    });
  });

  describe('right', () => {
    /* istanbul ignore if */
    if (process.env.bug_multipleArrows) {
      pending(process.env.bug_multipleArrows);
    }
    let textInput: TestElement;

    beforeEach(async () => {
      textInput = await demoForm.getControl('first input');
      await textInput.focus();
    });

    describe('that is empty', () => {
      it('should do nothing', async () => {
        await emulateKey.arrow.right();

        expect(await textInput.getProperty('selectionStart')).toBe(0, 'selection start');
        expect(await textInput.getProperty('selectionEnd')).toBe(0, 'selection end');
      });
    });

    describe('that contains text', () => {
      beforeEach(() => context.setValue('12345'));

      describe('with cursor at end', () => {
        beforeEach(() => context.setCursor(5));

        it('should do nothing', async () => {
          await emulateKey.arrow.right();

          expect(await textInput.getProperty('selectionStart')).toBe(5, 'selection start');
          expect(await textInput.getProperty('selectionEnd')).toBe(5, 'selection end');
        });
      });

      describe('with cursor at start', () => {
        beforeEach(() => context.setCursor(0));

        it('should move cursor to the next (right) character', async () => {
          await emulateKey.arrow.right();
          expect(await textInput.getProperty('selectionStart')).toBe(1, 'selection start');
          expect(await textInput.getProperty('selectionEnd')).toBe(1, 'selection end');
        });
      });

      describe('with cursor somewhere in the middle', () => {
        beforeEach(() => context.setCursor(3));

        it('should cursor to the next character', async () => {
          await emulateKey.arrow.right();
          expect(await textInput.getProperty('selectionStart')).toBe(4, 'selection start');
          expect(await textInput.getProperty('selectionEnd')).toBe(4, 'selection end');
        });
      });
    });
  });

  describe('left', () => {
    /* istanbul ignore if */
    if (process.env.bug_multipleArrows) {
      pending(process.env.bug_multipleArrows);
    }

    let textInput: TestElement;

    beforeEach(async () => {
      textInput = await demoForm.getControl('first input');
      await textInput.focus();
    });

    describe('that is empty', () => {
      it('should do nothing', async () => {
        await emulateKey.arrow.left();

        expect(await textInput.getProperty('selectionStart')).toBe(0, 'selection start');
        expect(await textInput.getProperty('selectionEnd')).toBe(0, 'selection end');
      });
    });

    describe('that contains text', () => {
      beforeEach(() => context.setValue('12345'));

      describe('with cursor at end', () => {
        beforeEach(() => context.setCursor(5));

        it('should move cursor one character left', async () => {
          await emulateKey.arrow.left();

          expect(await textInput.getProperty('selectionStart')).toBe(4, 'selection start');
          expect(await textInput.getProperty('selectionEnd')).toBe(4, 'selection end');
        });
      });

      describe('with cursor at start of text', () => {
        beforeEach(() => context.setCursor(0));

        it('should do nothing', async () => {
          await emulateKey.arrow.left();
          expect(await textInput.getProperty('selectionStart')).toBe(0, 'selection start');
          expect(await textInput.getProperty('selectionEnd')).toBe(0, 'selection end');
        });
      });

      describe('with cursor somewhere in the middle', () => {
        beforeEach(() => context.setCursor(3));

        it('should cursor to the next character', async () => {
          await emulateKey.arrow.left();
          expect(await textInput.getProperty('selectionStart')).toBe(2, 'selection start');
          expect(await textInput.getProperty('selectionEnd')).toBe(2, 'selection end');
        });
      });
    });
  });
}
