import { useState } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';

export function AddProjectForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    projectName: '',
    projectType: 'Residential',
    customProjectType: '',
    description: '',
    location: '',
  });

  const [featureImage, setFeatureImage] = useState<{ file: File; preview: string } | null>(null);
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleFeatureImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    if (featureImage) {
      URL.revokeObjectURL(featureImage.preview);
    }

    setFeatureImage({
      file,
      preview: URL.createObjectURL(file),
    });
  };

  const removeFeatureImage = () => {
    if (featureImage) {
      URL.revokeObjectURL(featureImage.preview);
      setFeatureImage(null);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (!formData.projectName.trim()) {
      setError('Project name is required');
      return;
    }
    if (!featureImage) {
      setError('Featured image is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }
    if (!formData.location.trim()) {
      setError('Location is required');
      return;
    }
    if (formData.projectType === 'Other' && !formData.customProjectType.trim()) {
      setError('Please enter a custom project type');
      return;
    }
    if (images.length === 0) {
      setError('Please upload at least one project image');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Here you would send the form data to your backend
      console.log('Project submitted:', {
        ...formData,
        featureImage: featureImage.file.name,
        projectType: formData.projectType === 'Other' ? formData.customProjectType : formData.projectType,
        imageCount: images.length,
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError('Failed to create project. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="p-8 md:p-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
          <svg
            className="w-8 h-8 text-primary animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-display tracking-wider text-foreground mb-2">
          Success!
        </h3>
        <p className="text-foreground/60">Project has been created successfully.</p>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-6 md:p-8 border-b border-primary/10">
        <h2 className="text-2xl md:text-3xl font-display tracking-wider text-foreground">
          Add New Project
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-secondary/50 rounded-lg transition-colors duration-300"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-foreground/60" />
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
        {/* Error Message */}
        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex items-start gap-3">
            <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Project Name */}
        <div className="group">
          <label className="block text-xs font-semibold text-foreground/60 tracking-widest uppercase mb-3 ml-1">
            Project Name *
          </label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleInputChange}
            placeholder="Enter project name"
            className="w-full bg-secondary/50 border border-primary/15 rounded-lg px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/40 focus:bg-secondary/80 transition-all duration-300"
          />
        </div>

        {/* Featured Image */}
        <div className="group">
          <label className="block text-xs font-semibold text-foreground/60 tracking-widest uppercase mb-3 ml-1">
            Featured Image (Thumbnail) *
          </label>
          
          {featureImage ? (
            <div className="relative rounded-lg overflow-hidden border border-primary/15 hover:border-primary/40 transition-all duration-300 group">
              <img
                src={featureImage.preview}
                alt="Featured"
                className="w-full h-48 object-cover"
              />
              <button
                type="button"
                onClick={removeFeatureImage}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
              >
                <Trash2 className="w-6 h-6 text-white" />
              </button>
            </div>
          ) : (
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFeatureImageChange}
                className="hidden"
                id="feature-image-upload"
              />
              <label
                htmlFor="feature-image-upload"
                className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-primary/30 rounded-lg hover:border-primary/50 hover:bg-secondary/30 cursor-pointer transition-all duration-300"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mb-2">
                    <Upload className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    Click to upload featured image
                  </p>
                  <p className="text-xs text-foreground/50">PNG, JPG, GIF up to 10MB</p>
                </div>
              </label>
            </div>
          )}
        </div>

        {/* Project Type */}
        <div className="group">
          <label className="block text-xs font-semibold text-foreground/60 tracking-widest uppercase mb-3 ml-1">
            Project Type *
          </label>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleInputChange}
            className="w-full bg-secondary/50 border border-primary/15 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary/40 focus:bg-secondary/80 transition-all duration-300"
          >
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Office">Office</option>
            <option value="Retail">Retail</option>
            <option value="Hospitality">Hospitality</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Custom Project Type (shown when "Other" is selected) */}
        {formData.projectType === 'Other' && (
          <div className="group">
            <label className="block text-xs font-semibold text-foreground/60 tracking-widest uppercase mb-3 ml-1">
              Custom Project Type *
            </label>
            <input
              type="text"
              name="customProjectType"
              value={formData.customProjectType}
              onChange={handleInputChange}
              placeholder="e.g., Medical, Educational, Industrial"
              className="w-full bg-secondary/50 border border-primary/15 rounded-lg px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/40 focus:bg-secondary/80 transition-all duration-300"
            />
          </div>
        )}

        {/* Location */}
        <div className="group">
          <label className="block text-xs font-semibold text-foreground/60 tracking-widest uppercase mb-3 ml-1">
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g., Pune, Maharashtra"
            className="w-full bg-secondary/50 border border-primary/15 rounded-lg px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/40 focus:bg-secondary/80 transition-all duration-300"
          />
        </div>

        {/* Description */}
        <div className="group">
          <label className="block text-xs font-semibold text-foreground/60 tracking-widest uppercase mb-3 ml-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe the project details, design inspiration, materials used, etc."
            rows={4}
            className="w-full bg-secondary/50 border border-primary/15 rounded-lg px-4 py-3 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-primary/40 focus:bg-secondary/80 transition-all duration-300 resize-none"
          />
        </div>

        {/* Image Upload */}
        <div className="group">
          <label className="block text-xs font-semibold text-foreground/60 tracking-widest uppercase mb-3 ml-1">
            Project Images *
          </label>

          {/* Upload Area */}
          <div className="relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-primary/30 rounded-lg hover:border-primary/50 hover:bg-secondary/30 cursor-pointer transition-all duration-300 group"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3 group-hover:bg-primary/15">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-semibold text-foreground mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-foreground/50">PNG, JPG, GIF up to 10MB each</p>
              </div>
            </label>
          </div>

          {/* Image Preview Grid */}
          {images.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-semibold text-foreground/60 tracking-widest uppercase mb-4">
                Selected Images ({images.length})
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative group rounded-lg overflow-hidden border border-primary/15 hover:border-primary/40 transition-all duration-300"
                  >
                    <img
                      src={image.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
                    >
                      <Trash2 className="w-5 h-5 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </form>

      {/* Footer */}
      <div className="flex gap-3 p-6 md:p-8 border-t border-primary/10 bg-secondary/20">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-3 border border-primary/30 text-foreground rounded-lg hover:bg-secondary/50 transition-colors duration-300 font-semibold tracking-wider uppercase text-sm"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold tracking-wider uppercase text-sm"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              Saving...
            </span>
          ) : (
            'Save Project'
          )}
        </button>
      </div>
    </>
  );
}
