import torch
import onnxruntime as ort
import sys

print("=" * 50)
print("M-DAVE ENVIRONMENT ACCELERATION CHECK")
print("=" * 50)

# 1. PyTorch CUDA Check
print(f"Python Version: {sys.version.split()[0]}")
print(f"PyTorch Version: {torch.__version__}")
cuda_available = torch.cuda.is_available()
print(f"CUDA Available in PyTorch: {cuda_available}")

if cuda_available:
    gpu_name = torch.cuda.get_device_name(0)
    vram_gb = torch.cuda.get_device_properties(0).total_memory / (1024**3)
    print(f"Detected GPU: {gpu_name} ({vram_gb:.2f} GB VRAM)")

# 2. ONNX Runtime GPU Execution Provider Check
print("-" * 50)
available_providers = ort.get_available_providers()
print(f"ONNX Runtime Execution Providers: {available_providers}")

if 'CUDAExecutionProvider' in available_providers:
    print("SUCCESS: ONNX Runtime CUDA Acceleration is Active!")
else:
    print("WARNING: CUDA Execution Provider not found for ONNX. Check CUDA setup.")

print("=" * 50)