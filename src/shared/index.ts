import $api from "./api/axiosInstance";
import useDebounce from "./lib/hooks/useDebounce";
import { useInput } from "./lib/hooks/useInput";
import { useInputValidation } from "./lib/hooks/useInputValidation";
import { useValidation } from "./lib/hooks/useValidation";
import AuthProvider from "./lib/providers/AuthProvider";
import ModeProvider from "./lib/providers/ThemeProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Badge } from "./ui/badge";
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PasswordInput } from "./ui/password-input";
import { cn } from '@/shared/lib/utils'
import { Skeleton } from "./ui/skeleton";
import BgImg from './images/bg-img.png'
import BaseInput from "./kit/BaseInput";
import SubmitButton from "./kit/SubmitButton";
import BasePasswordInput from "./kit/BasePasswordInput";
import UploadImage from './icons/upload-image.svg'
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import HomeLogo from './icons/home.svg'
import DiscoverLogo from './icons/discover.svg'
import MicroLogo from './icons/microphone.svg'
import ProfileLogo from './icons/profile.svg'
import MainLogo from './icons/logo.svg'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import LoaderSpinner from './kit/LoaderSpinner'
import { Textarea } from "./ui/textarea";
export {
  $api,
  useDebounce,
  useInput,
  useInputValidation,
  useValidation,
  AuthProvider,
  ModeProvider,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Badge,
  Alert, AlertDescription, AlertTitle,
  Label,
  Button,
  Input,
  PasswordInput,
  cn,
  Skeleton,
  BgImg,
  BaseInput,
  SubmitButton,
  BasePasswordInput,
  UploadImage,
  Toaster,
  useToast,
  HomeLogo,
  DiscoverLogo,
  MicroLogo,
  ProfileLogo,
  MainLogo,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  LoaderSpinner
}