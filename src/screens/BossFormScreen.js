import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  TextInput 
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

import Header from '../components/Header';
import { useBossManager } from '../hooks/useBossManager';

const BossFormScreen = ({ route, navigation }) => {
  const { boss } = route.params || {};
  const isEditing = !!boss;
  const { theme } = useTheme();
  
  const { handleAddBoss, handleUpdateBoss } = useBossManager();
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: boss?.name || '',
      location: boss?.location || '',
      difficulty: boss?.difficulty || 'Medium',
      attempts: boss?.attempts?.toString() || '0',
      notes: boss?.notes || '',
    }
  });

  const onSubmit = (data) => {
    const bossData = {
      ...data,
      attempts: parseInt(data.attempts) || 0,
    };

    if (isEditing) {
      handleUpdateBoss({ ...bossData, id: boss.id });
    } else {
      handleAddBoss(bossData);
    }
    
    navigation.goBack();
  };

  const difficulties = ['Easy', 'Medium', 'Hard', 'Very Hard'];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return theme.success;
      case 'Medium': return theme.warning;
      case 'Hard': return theme.danger;
      case 'Very Hard': return theme.primary;
      default: return theme.textMuted;
    }
  };

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Header title={isEditing ? 'Editar Jefe' : 'Agregar Jefe'} />
      
      <ScrollView style={styles.form}>
        {/* Nombres  */}
        <View style={styles.field}>
          <Text style={styles.label}>Nombre del Jefe *</Text>
          <Controller
            control={control}
            rules={{
              required: 'El nombre es obligatorio',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={[styles.input, errors.name && styles.inputError]}>
                <Ionicons name="skull-outline" size={20} color={theme.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Ej: Ornstein & Smough"
                  placeholderTextColor={theme.textMuted}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  color={theme.text}
                />
              </View>
            )}
            name="name"
          />
          {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
        </View>

        {/* ubicacion de los campos */}
        <View style={styles.field}>
          <Text style={styles.label}>Ubicación *</Text>
          <Controller
            control={control}
            rules={{
              required: 'La ubicación es obligatoria',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={[styles.input, errors.location && styles.inputError]}>
                <Ionicons name="location-outline" size={20} color={theme.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Ej: Anor Londo"
                  placeholderTextColor={theme.textMuted}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  color={theme.text}
                />
              </View>
            )}
            name="location"
          />
          {errors.location && <Text style={styles.errorText}>{errors.location.message}</Text>}
        </View>

        {/* Niveles de Dificultad */}
        <View style={styles.field}>
          <Text style={styles.label}>Dificultad</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <View style={styles.difficultyContainer}>
                {difficulties.map((diff) => (
                  <TouchableOpacity
                    key={diff}
                    style={[
                      styles.difficultyButton,
                      value === diff && styles.difficultyButtonSelected,
                      { backgroundColor: getDifficultyColor(diff) }
                    ]}
                    onPress={() => onChange(diff)}
                  >
                    <Text style={[
                      styles.difficultyText,
                      value === diff && styles.difficultyTextSelected
                    ]}>
                      {diff}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            name="difficulty"
          />
        </View>

        {/* INTENTOS */}
        <View style={styles.field}>
          <Text style={styles.label}>Intentos</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.input}>
                <Ionicons name="repeat-outline" size={20} color={theme.textMuted} style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="0"
                  placeholderTextColor={theme.textMuted}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                  color={theme.text}
                />
              </View>
            )}
            name="attempts"
          />
        </View>

        {/* NOTAS / DESCRIPCION */}
        <View style={styles.field}>
          <Text style={styles.label}>Notas</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.textArea}>
                <Ionicons name="document-text-outline" size={20} color={theme.textMuted} style={styles.textAreaIcon} />
                <TextInput
                  style={styles.textAreaInput}
                  placeholder="Estrategias, consejos, etc..."
                  placeholderTextColor={theme.textMuted}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  color={theme.text}
                />
              </View>
            )}
            name="notes"
          />
        </View>

        {/* BOTON DE ENVIO */}
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.submitButtonText}>
            {isEditing ? 'Actualizar Jefe' : 'Agregar Jefe'}
          </Text>
        </TouchableOpacity>

        {/* BOTON DE CANCELAR */}
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  form: {
    flex: 1,
    padding: 16,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: theme.text,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.inputBackground,
    borderWidth: 1,
    borderColor: theme.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
  },
  inputError: {
    borderColor: theme.danger,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  errorText: {
    color: theme.danger,
    fontSize: 14,
    marginTop: 5,
  },
  difficultyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  difficultyButton: {
    flex: 1,
    minWidth: '23%',
    padding: 12,
    margin: 2,
    borderRadius: 6,
    alignItems: 'center',
  },
  difficultyButtonSelected: {
    borderWidth: 2,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  difficultyText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  difficultyTextSelected: {
    fontSize: 13,
  },
  textArea: {
    backgroundColor: theme.inputBackground,
    borderWidth: 1,
    borderColor: theme.inputBorder,
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
  },
  textAreaIcon: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  textAreaInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 30,
    paddingRight: 10,
  },
  submitButton: {
    backgroundColor: theme.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: theme.card,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: theme.border,
  },
  cancelButtonText: {
    color: theme.text,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default BossFormScreen;