import { expect, test, describe, vi } from 'vitest';
import { showToast, ToastType, options } from './toastUtils';

describe('showToast', () => {
  test('Shows error', async () => {
    const toast = await import('react-toastify');

    const error = vi.spyOn(toast.toast, 'error');

    showToast('test', ToastType.error);
    expect(error).toHaveBeenCalled();
    expect(error).toHaveBeenCalledWith('test', options);
  });

  test('Shows info', async () => {
    const toast = await import('react-toastify');

    const info = vi.spyOn(toast.toast, 'info');

    showToast('test', ToastType.info);
    expect(info).toHaveBeenCalled();
    expect(info).toHaveBeenCalledWith('test', options);
  });

  test('Shows success', async () => {
    const toast = await import('react-toastify');

    const success = vi.spyOn(toast.toast, 'success');

    showToast('test', ToastType.success);
    expect(success).toHaveBeenCalled();
    expect(success).toHaveBeenCalledWith('test', options);
  });
});
