"use client"

import { useState, useEffect } from "react"
// import { AppSidebar } from "@/components/app-sidebar"
import AdminSidebar from "@/components/AdminSidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, ArrowLeft, ArrowRight, X } from "lucide-react" // Import X icon for module delete
import Link from "next/link"
import { LessonBlock } from "@/components/lesson-block"
import { CardHeader, CardTitle } from "@/components/ui/card" // Import CardHeader and CardTitle
import { useRouter } from 'next/navigation';
import NotificationModal from '@/components/ui/NotificationModal';

export default function UploadCourseContent() {
  const router = useRouter();
  const [modules, setModules] = useState([{ id: 1, title: '', description: '', lessons: [{ id: 1 }] }]);
  const [nextModuleId, setNextModuleId] = useState(2);
  const [nextLessonId, setNextLessonId] = useState(2);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Load modules data from localStorage on mount
  useEffect(() => {
    loadModulesFromStorage();
  }, []);

  function loadModulesFromStorage() {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('newModulesData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (Array.isArray(data)) {
          setModules(data);
          // Find the max id for modules and lessons to avoid id collision
          let maxModuleId = 1;
          let maxLessonId = 1;
          data.forEach((mod: any) => {
            if (mod.id && mod.id > maxModuleId) maxModuleId = mod.id;
            if (Array.isArray(mod.lessons)) {
              mod.lessons.forEach((lesson: any) => {
                if (lesson.id && lesson.id > maxLessonId) maxLessonId = lesson.id;
              });
            }
          });
          setNextModuleId(maxModuleId + 1);
          setNextLessonId(maxLessonId + 1);
        }
      } catch {}
    }
  }

  // Mark as dirty on any change
  function markDirty() { setHasUnsavedChanges(true); }

  // Add beforeunload warning for unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [hasUnsavedChanges]);

  function showModal(message: string, timeout = 2000) {
    setModalMessage(message);
    setModalOpen(true);
    // NotificationModal auto-closes after timeout
  }

  // Save handler
  function handleSave() {
    localStorage.setItem('newModulesData', JSON.stringify(modules));
    setHasUnsavedChanges(false);
    showModal('Modules saved!');
  }

  // Confirm navigation if unsaved changes
  function confirmNav(action: () => void) {
    if (!hasUnsavedChanges) {
      action();
    } else {
      setModalMessage('You have unsaved changes. Please save before leaving.');
      setModalOpen(true);
    }
  }

  const handleAddModule = () => {
    setModules([...modules, { id: nextModuleId, title: '', description: '', lessons: [{ id: nextLessonId }] }]);
    setNextModuleId(nextModuleId + 1);
    setNextLessonId(nextLessonId + 1);
    markDirty();
  }

  const handleDeleteModule = (moduleId: number) => {
    setModules(modules.filter((module) => module.id !== moduleId));
    markDirty();
  }

  const handleAddLesson = (moduleId: number) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId ? { ...module, lessons: [...module.lessons, { id: nextLessonId }] } : module,
      ),
    );
    setNextLessonId(nextLessonId + 1);
    markDirty();
  }

  const handleDeleteLesson = (moduleId: number, lessonId: number) => {
    setModules(
      modules
        .map((module) =>
          module.id === moduleId
            ? { ...module, lessons: module.lessons.filter((lesson) => lesson.id !== lessonId) }
            : module,
        )
        .filter((module) => module.lessons.length > 0),
    );
    markDirty();
  }

  const handleModuleTitleChange = (moduleId: number, title: string) => {
    setModules(modules.map(module => 
      module.id === moduleId ? { ...module, title } : module
    ));
    markDirty();
  }

  const handleModuleDescriptionChange = (moduleId: number, description: string) => {
    setModules(modules.map(module => 
      module.id === moduleId ? { ...module, description } : module
    ));
    markDirty();
  }

  const handlePreviewAndPublish = () => {
    handleSave();
    router.push('/admin/course-management/course-preview');
  }

  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-lg font-semibold text-gray-500">Course Content Creation</h2>
        </header>

        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Upload Course Content</h1>
            <div className="flex space-x-3">
              <Button onClick={handleAddModule} className="bg-[#0747A1] hover:bg-blue-700 text-white flex items-center justify-center gap-2">
                <span>New Module</span>
                <Plus className="h-4 w-4" />
              </Button>
              <Button className="bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2" onClick={handlePreviewAndPublish}>
                <span>Preview & Publish</span>
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-6">Add your modules and course resources here.</p>

          {modules.map((module, moduleIndex) => (
            <div key={module.id} className="mb-8 p-6 border rounded-lg bg-gray-50">
              <CardHeader className="flex flex-row items-center justify-between p-0 pb-4">
                <div className="flex flex-col space-y-2">
                  <CardTitle className="text-2xl font-bold">Module {moduleIndex + 1}</CardTitle>
                  <Input
                    placeholder="Enter module title..."
                    value={module.title || ''}
                    onChange={(e) => handleModuleTitleChange(module.id, e.target.value)}
                    className="w-150"
                  />
                  <Textarea
                    placeholder="Enter module description..."
                    value={module.description || ''}
                    onChange={(e) => handleModuleDescriptionChange(module.id, e.target.value)}
                    className="w-150"
                    rows={3}
                  />
                </div>
                {modules.length > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => handleDeleteModule(module.id)}
                    className="text-red-500 hover:bg-red-100"
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Delete Module</span>
                  </Button>
                )}
              </CardHeader>
              {module.lessons.map((lesson, lessonIndex) => (
                <LessonBlock
                  key={lesson.id}
                  lessonNumber={lessonIndex + 1}
                  lesson={lesson}
                  onChange={updatedLesson => {
                    setModules(prevModules => prevModules.map(m =>
                      m.id === module.id
                        ? { ...m, lessons: m.lessons.map(l => l.id === lesson.id ? updatedLesson : l) }
                        : m
                    ));
                  }}
                  onDelete={() => handleDeleteLesson(module.id, lesson.id)}
                />
              ))}
              <Button
                variant="outline"
                onClick={() => handleAddLesson(module.id)}
                className="w-full mt-4 bg-transparent flex items-center justify-center gap-2 px-3 py-2 text-sm"
              >
                <span>New Lesson</span>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ))}

          <div className="flex flex-col items-center mt-8 w-full">
            <div className="flex justify-between w-full">
              <Button
                variant="outline"
                className="bg-transparent flex items-center justify-center gap-2"
                onClick={() => {
                  // Always save modules before navigating back
                  localStorage.setItem('newModulesData', JSON.stringify(modules));
                  setHasUnsavedChanges(false);
                  router.back();
                }}
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                onClick={() => {
                  // Always save modules before navigating next
                  localStorage.setItem('newModulesData', JSON.stringify(modules));
                  setHasUnsavedChanges(false);
                  setModalMessage('Modules saved!');
                  setModalOpen(true);
                  setTimeout(() => {
                    router.push('/admin/course-management/course-preview');
                  }, 2000);
                }}
              >
                <span>Next</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="w-full flex justify-center mt-4">
              <div className="w-2/2 border-t border-gray-300" />
            </div>
            <Button
              variant="outline"
              className="mt-4 border-red-500 text-red-600 hover:bg-red-50 hover:border-red-600"
              onClick={() => {
                localStorage.removeItem('newModulesData');
                setModules([{ id: 1, title: '', description: '', lessons: [{ id: 1 }] }]);
                setNextModuleId(2);
                setNextLessonId(2);
                setHasUnsavedChanges(false);
                showModal('Modules reset!');
              }}
            >
              Reset
            </Button>
          </div>
        </section>
      </main>
      <NotificationModal open={modalOpen} onClose={() => setModalOpen(false)} message={modalMessage} />
    </div>
  )
}
